import { CommandManager } from "tui-editor";

export const MdAddHighlighting = CommandManager.command('markdown', {
	name: 'highlighting',
	exec: (mde, color) => {
		if (!color) {
			return;
		}

		const cm = mde.getEditor();
		const rangeFrom = cm.getCursor('from');
		const rangeTo = cm.getCursor('to');

		const text = cm.getSelection();

		const replaceText = `<span class='hl hl-${color}'>${text}</span>`;

		cm.replaceSelection(replaceText);

		mde.focus();
	}
});
