import { Component, Input, OnInit, ElementRef, forwardRef, ViewEncapsulation, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as TuiEditor from 'tui-editor';
import ToastUIEditor from 'tui-editor';
import "./extensions/highlighter/tui-editor-extHighlighter";
var noOp = () => { };

export const MD_EDITOR_VALUE_ACCESSOR: any = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => MarkdownEditorComponent),
	multi: true,
};

@Component({
  selector: 'app-markdown-editor',
	encapsulation: ViewEncapsulation.None,
  templateUrl: './markdown-editor.component.html',
  styleUrls: [
		'../../../node_modules/tui-editor/dist/tui-editor-contents.css',
		'../../../node_modules/tui-editor/dist/tui-editor.css',
    './codemirror.css',
    './markdown-editor.component.css'],
  providers: [MD_EDITOR_VALUE_ACCESSOR]
})

export class MarkdownEditorComponent implements OnInit, ControlValueAccessor {

  @Input()
  options: any;
  title = 'Toast UI Editor';
  private _editor: TuiEditor;
  private onTouchedCallback: () => void = noOp;
	private onChangeCallback: (_: any) => void = noOp;

	constructor(private renderer: Renderer2, private el: ElementRef) {  } 

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
    this.createEditor();
  }

  private createEditor(): void {

    let showsProblemContent = [
    'Here is some <span class="hl hl-1">normal text</span> with a highlight',
    '```',
    'and <span class="hl hl-1">here</span> is a highlight inside a code block',
    '```',
    'notice that the code block highlight shows up in the markdown viewer but not in the WYSIWYG viewer... that is the issue.'
    ].join('\n');

		this._editor = new TuiEditor(Object.assign({
			el: this.el.nativeElement,
			initialEditType: 'markdown',
			previewStyle: 'vertical',
			height: '300px',
			usageStatistics: false,
			events: {
				change: this._onEditorValueChange.bind(this),
			},
      exts: ['highlighter'],
      initialValue: showsProblemContent
		}, this.options));

		ToastUIEditor.markdownitHighlight.options.highlight = function (code) {
			// apply highlighting

			// this LOOKS like the left and right sides are the same but it is not
			let value = code.replace(/<(span class='hl hl-1')>(.*)<(\/span)>/g, "<$1>$2<$3>");

			// legacy support
			value = value.replace(/\.(\w+?)(\^)([\s\S]+?)\^/g, "<span class='hl hl-1'>$3</span>");

			return value;
    };
    
  }
  
  private _onEditorValueChange(): void {
		const markdownData = this._editor.getMarkdown();

		this.onChangeCallback(markdownData);
  }
  
  public writeValue(value: any): void {
		const markdownData = this._editor.getMarkdown();

		if (value != markdownData) {
			this._editor.setMarkdown(value);
		}
	}

	public registerOnChange(fn: any): void {
		this.onChangeCallback = fn;
	}

	public registerOnTouched(fn: any): void {
		this.onTouchedCallback = fn;
	}

	public setDisabledState?(isDisabled: boolean): void {
		// the editor does not support disabling
	}

}

