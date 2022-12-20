import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import NfcManager, {NfcTech, NfcEvents} from 'react-native-nfc-manager';

// Pre-step, call this before any NFC operations
//NfcManager.start();

function App() {
  async function readNdef() {
    try {
      const isEnabled = await NfcManager.isEnabled();
      if (!isEnabled) {
        // Prompt the user to enable
        console.warn('NFC não Encotrado !!! ');
        return;
      }
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology([NfcTech.Ndef, NfcTech.NdefFormatable, NfcTech.NdefFormatable]);
      // the resolved tag object will contain `ndefMessage` property
      NfcManager.setEventListener(NfcEvents.DiscoverTag, this._onTagDiscovered);
      const tag = await NfcManager.getTag;
      console.warn('Tag found', tag);
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={readNdef}>
        <Text>Scan a Tag</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
