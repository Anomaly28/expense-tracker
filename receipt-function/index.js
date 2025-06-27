const { DocumentProcessorServiceClient } = require('@google-cloud/documentai').v1;
const { Firestore } = require('@google-cloud/firestore');
const { Storage } = require('@google-cloud/storage');

const firestore = new Firestore();
const storage = new Storage();
const client = new DocumentProcessorServiceClient();

const PROJECT_ID = 'steel-acumen-462107-g9';
const LOCATION = 'us';
const PROCESSOR_ID = 'e87d2008287c8c33'; // ✅ Your actual processor ID

exports.processReceipt = async (event, context) => {
  try {
    const fileBucket = event.bucket;
    const fileName = event.name;
    const filePath = `gs://${fileBucket}/${fileName}`;
    const name = `projects/${PROJECT_ID}/locations/${LOCATION}/processors/${PROCESSOR_ID}`;

    // ✅ Download file from GCS
    const [fileBuffer] = await storage.bucket(fileBucket).file(fileName).download();
    const encodedImage = Buffer.from(fileBuffer).toString('base64');

    // ✅ Detect MIME type
    const mimeType = fileName.endsWith('.pdf') ? 'application/pdf' : 'image/jpeg';

    // ✅ Get custom metadata
    const [metadata] = await storage.bucket(fileBucket).file(fileName).getMetadata();
    const uid = metadata.metadata?.uid;

    if (!uid) {
      console.error(`❌ Missing UID in metadata for file: ${fileName}`);
      return;
    }

    // ✅ Call Document AI to extract receipt data
    const request = {
      name,
      rawDocument: {
        content: encodedImage,
        mimeType: mimeType,
      },
    };

    const [result] = await client.processDocument(request);
    const doc = result.document;

    // ✅ Extract fields
    const fields = {};
    (doc.entities || []).forEach((entity) => {
      fields[entity.type.toLowerCase()] = entity.mentionText;
    });

    console.log("✅ Extracted fields:", fields);

    // ✅ Build the Firestore entry
    const expense = {
      uid: uid, // ✅ THIS IS CRITICAL: must match frontend filter
      vendor: fields['supplier_name'] || 'Unknown',
      amount: parseFloat(fields['total_amount'] || 0),
      date: fields['date'] || new Date().toISOString().split("T")[0],
      category: "Food", // You can later replace with auto-detected category
      createdAt: new Date().toISOString(),
      downloadURL: `https://storage.googleapis.com/${fileBucket}/${fileName}`
    };

    // ✅ Save to Firestore
    await firestore.collection('expenses').add(expense);
    console.log(`✅ Saved expense for UID: ${uid}`);

  } catch (error) {
    console.error("❌ Error in processReceipt function:", error);
  }
};
