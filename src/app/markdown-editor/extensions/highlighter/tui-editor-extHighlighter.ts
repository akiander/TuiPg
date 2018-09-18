import * as Editor from 'tui-editor';

import { MdAddHighlighting } from './commands/markdown-commands/add-highlighting';
import { WwAddHighlighting } from './commands/wysiwyg-commands/add-highlighting';

function highlighterExtension(editor) {
	const { colorSyntax = {} } = editor.options;
	const { preset, useCustomSyntax = false } = colorSyntax;

	if (editor.isViewer()) {
		return;
	}

	if (editor.getUI().name === 'default') {
		// define commands for both modes
		editor.addCommand(MdAddHighlighting);
		editor.addCommand(WwAddHighlighting);

		// initialize
		initUI(editor, preset);
	}

	function initUI(editor, preset) {
		const name = 'highlighter';
		const className = 'tui-color';		// need to change this to ours
		//const i18n = editor.i18n;		// not sure how to use this Internationalization
		const toolbar = editor.getUI().getToolbar();

		editor.eventManager.addEventType('highlighterButtonClicked');

		toolbar.insertItem(4, {
			type: 'button',
			options: {
				name,
				className,
				//command: 'highlighting',
				event: 'highlighterButtonClicked',
				tooltip: 'Highlighter'
			}
		});

		// listen for toolbar button click event
		editor.eventManager.listen('highlighterButtonClicked', () => {
			editor.eventManager.emit('command', 'highlighting', '1')
		});
	}
}

Editor.defineExtension('highlighter', highlighterExtension);
