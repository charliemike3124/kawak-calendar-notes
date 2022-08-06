// This is an example CRUD service for Firebase Firestore
// Applications. For more info, go to the following link:
// https://firebase.google.com/docs/firestore/quickstart

import { App } from "@/firebase.config";
import { getFirestore, collection, addDoc, getDoc, setDoc, doc, onSnapshot } from "firebase/firestore";

const Database = getFirestore(App);
const EXAMPLE_COLLECTION = collection(Database, "EXAMPLE_COLLECTION");

let unsubscribeFromDocument = null;

const SheetService = {
  //-- Creates a document and returns its id.
  async CreateDocument(sheetData) {
    const doc = await addDoc(EXAMPLE_COLLECTION, sheetData);
    return doc.id;
  },
  //-- Gets a document that matches the id passed by param.
  async GetDocumentById(documentId) {
    const docRef = doc(EXAMPLE_COLLECTION, documentId);
    const document = await getDoc(docRef);
    return document.exists() ? document.data() : null;
  },
  //-- Updates a sheet document that matches the code in sheetData.
  async UpdateDocument(data, documentId) {
    const docRef = doc(EXAMPLE_COLLECTION, documentId);
    const document = await getDoc(docRef);
    if (document.exists()) {
      await setDoc(docRef, data);
    }
  },
  //-- Executes "callback" everytime the document changes and returns the initial state of the document if it exists.
  async SubscribeToDocument(callback, documentId) {
    const docRef = doc(EXAMPLE_COLLECTION, documentId);
    const document = await getDoc(docRef);
    if (document.exists()) {
      unsubscribeFromDocument = onSnapshot(docRef, (document) => {
        callback(document.data());
      });
    }
    return document.exists() ? document.data() : null;
  },
  //-- Unsubscribe from any document changes
  async UnsubscribeFromDocument() {
    if (!!unsubscribeFromDocument) {
      unsubscribeFromDocument();
    }
  },
};

export default SheetService;
