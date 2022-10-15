'use babel';

import MandiYukView from './mandi-yuk-view';
import { CompositeDisposable } from 'atom';

export default {

  mandiYukView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.mandiYukView = new MandiYukView(state.mandiYukViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.mandiYukView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'mandi-yuk:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.mandiYukView.destroy();
  },

  serialize() {
    return {
      mandiYukViewState: this.mandiYukView.serialize()
    };
  },

  toggle() {
    console.log('MandiYuk was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
