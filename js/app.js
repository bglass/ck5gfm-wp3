/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 */

import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
import AutoformatPlugin from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockquotePlugin from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import EasyimagePlugin from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import HeadingPlugin from '@ckeditor/ckeditor5-heading/src/heading';
import ImagePlugin from '@ckeditor/ckeditor5-image/src/image';
import ImagecaptionPlugin from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImagestylePlugin from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImagetoolbarPlugin from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageuploadPlugin from '@ckeditor/ckeditor5-image/src/imageupload';
import LinkPlugin from '@ckeditor/ckeditor5-link/src/link';
import ListPlugin from '@ckeditor/ckeditor5-list/src/list';
import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph';

import GFMDataProcessor from '@ckeditor/ckeditor5-markdown-gfm/src/gfmdataprocessor';

// WARNING: The URLs below should not be used for any other purpose than Easy Image plugin development.
// Images uploaded using the testing token service may be deleted automatically at any moment.
// If you would like to try the Easy Image service, please sign up for a free trial (https://ckeditor.com/ckeditor-cloud-services/).
// Images uploaded during the free trial will not be deleted for the whole trial period and additionally the trial service can be converted
// into a subscription at any moment, allowing you to preserve all uploaded images.
const TOKEN_URL = 'https://33333.cke-cs.com/token/dev/ijrDsqFix838Gh3wGO3F77FSW94BwcLXprJ4APSp3XQ26xsUHTi0jcb1hoBt';
const UPLOAD_URL = 'https://33333.cke-cs.com/easyimage/upload/';
const CS_CONFIG = {
	tokenUrl: TOKEN_URL,
	uploadUrl: UPLOAD_URL
};

function Markdown( editor ) {
    editor.data.processor = new GFMDataProcessor();
}


ClassicEditor
	.create( document.querySelector( '#editor' ), {
		plugins: [
			Markdown,
			EssentialsPlugin,
			AutoformatPlugin,
			BoldPlugin,
			ItalicPlugin,
			BlockquotePlugin,
			EasyimagePlugin,
			HeadingPlugin,
			ImagePlugin,
			ImagecaptionPlugin,
			ImagestylePlugin,
			ImagetoolbarPlugin,
			ImageuploadPlugin,
			LinkPlugin,
			ListPlugin,
			ParagraphPlugin
		],
		toolbar: {
			items: [
				'heading',
				'|',
				'bold',
				'italic',
				'link',
				'bulletedList',
				'numberedList',
				'imageUpload',
				'blockQuote',
				'undo',
				'redo'
			]
		},
		image: {
			toolbar: [
				'imageStyle:full',
				'imageStyle:side',
				'|',
				'imageTextAlternative'
			]
		},
		cloudServices: CS_CONFIG
	} )
	.then( ( editor ) => {
		window.editor = editor;
		window.editor.setData( 'This is **bold** and *italic*.' );
	} )
	.catch( ( err ) => {
		console.error( err.stack );
		showCompatibilityMessage();
	} );

function showCompatibilityMessage() {
	const editorElement = document.querySelector( '#editor' );
	const message = document.createElement( 'p' );

	message.innerHTML = `
		<h2>That's a shame...</h2>
		<p>We're not proud of this but this developer preview does not work in your web browser.</p>
		<p>If you think that this is inacceptable, please <a href="https://github.com/ckeditor/ckeditor5/issues/new">report this to us</a>.</p>
	`;

	message.classList.add( 'message' );

	editorElement.style.display = 'none';
	editorElement.parentNode.insertBefore( message, editorElement );
}
