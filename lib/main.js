"use babel";

import _ from "lodash";

function isMappedToGrammer(grammar) {
  return (builder) => {
    return _.includes(builder.grammars, grammar);
  };
}

export default {
  activate() {
    this.commands = atom.commands.add("atom-workspace", {
      "gluon:build": () => { this.build(); },
    });
  },

  deactivate() {
    this.commands.dispose();
  },

  registerBuilder(builder) {
    this.builders = this.builders || {};
    this.builders[builder.name] = builder;
  },

  build() {
    const builder = this.builderForActiveTextEditor();
    if (!builder) { return; }

    builder.build();
  },

  builderForActiveTextEditor() {
    const grammar = this.getActiveGrammar();
    if (!grammar) { return null; }

    const builder = _.find(this.builders, isMappedToGrammer(grammar));
    return builder;
  },

  getActiveGrammar() {
    const editor = this.getActiveTextEditor();
    if (!editor) { return null; }

    return editor.getGrammar().scopeName;
  },

  getActiveTextEditor() {
    return atom.workspace.getActiveTextEditor();
  },
};
