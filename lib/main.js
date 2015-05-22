"use babel";

import _ from "lodash";

function isMappedToGrammer(grammar) {
  return (builder) => {
    console.log(builder);
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

  provideBuildService() {
    const self = this;
    return {
      register(registration) {
        if (!registration) { return; }

        self.builders = self.builders || {};
        self.builders[registration.name] = registration;
      },
    };
  },

  build() {
    const builder = this.builderForActiveTextEditor();
    if (!builder) { return; }

    builder.buildFunction();
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
