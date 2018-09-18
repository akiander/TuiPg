import { CommandManager } from "tui-editor";

export const WwAddHighlighting = CommandManager.command('wysiwyg', {
	name: 'highlighting',
	exec: (wwe, color) => {
		if (!color) {
			return;
		}

		const sq = wwe.getEditor();

		let isAdd = !sq.hasFormat('SPAN');

		sq.changeFormat(isAdd ? {
			tag: 'SPAN',
			attributes: {
				'class': `hl hl-${color}`
			}
		} : null, {
				tag: 'SPAN'
			}, null, true);

		wwe.focus();
	}
});
