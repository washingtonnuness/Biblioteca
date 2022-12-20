import NFC, { Ndef } from 'react-native-nfc-manager';

async function readNfcTag() {
  try {
    const isEnabled = await NFC.isEnabled();
    if (!isEnabled) {
      // Prompt the user to enable NFC
      return;
    }

    const isSupported = await NFC.isSupported();
    if (!isSupported) {
      // NFC is not supported on this device
      return;
    }

    // Start listening for NFC tags
    NFC.addListener((payload) => {
      // Parse the payload into an NDEF message
      const message = Ndef.parse(payload.data);

      // Do something with the message here
    });
    NFC.start();
  } catch (error) {
    // Handle any errors here
  }
}
