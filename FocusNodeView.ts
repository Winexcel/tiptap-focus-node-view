// @ts-ignore
import { Extension } from '@tiptap/core';
// @ts-ignore
import { Plugin, PluginKey } from 'prosemirror-state';

const FocusNodeView = Extension.create <FocusOptions>({
  name: 'focus',

  defaultOptions: {
    className: 'has-focus',
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('focus'),
        props: {
          decorations: ({ doc, selection }) => {
            const { isEditable } = this.editor;
            const { anchor } = selection;

            doc.descendants((node, pos) => {
              if (node.isText) {
                return false;
              }

              if (!('hasFocus' in node.attrs)) return null;

              node.attrs.hasFocus = false;

              const isCurrent = anchor >= pos && anchor <= (pos + node.nodeSize - 1);

              if (!isCurrent) {
                return false;
              }

              node.attrs.hasFocus = isEditable;

              return true;
            });

            return null;
          },
        },
      }),
    ];
  },
});

export default FocusNodeView;
