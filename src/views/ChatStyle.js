export const ChatStyle = {
		general: {
			color: 'var(--font-color)',
			colorButtonClear: 'var(--theme-color-similar)',
			colorButton: 'var(--theme-color)',
			backgroundColorButton: '#1976d2',
			backgroundInput: 'transparent',
			colorPlaceholder: '#9ca6af',
			colorCaret: 'var(--theme-color)',
			colorSpinner: '#333',
			borderStyle: '1px solid #e1e4e8',
			backgroundScrollIcon: '#fff'
		},

		container: {
			border: 'none',
			borderRadius: '10px',
			boxShadow: '1px 1px 5px var(--shadow-color)'
		},

		header: {
			background: 'var(--bg-like)',
			colorRoomName: 'var(--theme-color)',
			// colorRoomInfo: 'green',
			position: 'absolute',
			width: '100%',
		},

		footer: {
			background: 'var(--bg-like)',
			borderStyleInput: '1px solid var(--bg-grey)',
			borderInputSelected: '1px solid var(--theme-color)',
			backgroundReply: 'var(--bg-color)',
			backgroundTagActive: '#e5e5e6',
			backgroundTag: '#f8f9fa'
		},

		content: {
			background: 'var(--bg-like)'
		},

		sidemenu: {
			background: 'var(--bg-like)',
			backgroundHover: 'var(--theme-color-lighter)',
			backgroundActive: 'var(--theme-color-similar)',
			// colorActive: 'yellow',
			borderColorSearch: 'var(--theme-color)'
		},

		dropdown: {
			background: 'var(--bg-like)',
			backgroundHover: 'var(--theme-color-lighter)'
		},

		message: {
			background: 'var(--bg-light-grey)',
			backgroundMe: 'var(--theme-color-lighter)',
			color: 'var(--font-color)',
			colorStarted: 'var(--font-color)',
			backgroundDeleted: '#dadfe2', // ?
			backgroundSelected: '#c2dcf2', // ?
			colorDeleted: '#757e85',
			colorUsername: 'var(--theme-color)',
			colorTimestamp: 'var(--font-color)',
			backgroundDate: 'var(--bg-like)',
			colorDate: 'var(--bg-grey)',
			backgroundSystem: '#e5effa',
			colorSystem: '#505a62', // ?
			backgroundMedia: 'rgba(0, 0, 0, 0.15)', // ?
			backgroundReply: 'var(--bg-light-grey)', // ?
			colorReplyUsername: 'var(--theme-color)',
			colorReply: 'var(--theme-color)',
			colorTag: '#0d579c',
			backgroundImage: '#ddd',
			colorNewMessages: 'var(--theme-color)',
			backgroundScrollCounter: '#0696c7',
			colorScrollCounter: '#fff',
			backgroundReaction: '#eee',
			borderStyleReaction: '1px solid #eee',
			backgroundReactionHover: '#fff',
			borderStyleReactionHover: '1px solid #ddd',
			colorReactionCounter: '#0a0a0a',
			backgroundReactionMe: '#cfecf5',
			borderStyleReactionMe: '1px solid #3b98b8',
			backgroundReactionHoverMe: '#cfecf5',
			borderStyleReactionHoverMe: '1px solid #3b98b8',
			colorReactionCounterMe: '#0b59b3',
			backgroundAudioRecord: 'green',
			backgroundAudioLine: 'var(--theme-color-contrast)',
			// backgroundAudioProgress: 'yellow',
			backgroundAudioProgressSelector: 'var(--theme-color)',
			colorFileExtension: '#757e85'
		},

		// markdown: {
		// 	background: 'rgba(239, 239, 239, 0.7)',
		// 	border: 'rgba(212, 212, 212, 0.9)',
		// 	color: '#e01e5a',
		// 	colorMulti: '#0a0a0a'
		// },

		room: {
			colorUsername: 'var(--font-color)',
			colorMessage: 'grey',
			colorTimestamp: 'grey',
			colorStateOnline: '#4caf50',
			colorStateOffline: '#9ca6af',
			backgroundCounterBadge: '#0696c7',
			colorCounterBadge: '#fff'
		},

		emoji: {
			background: '#fff'
		},

		icons: {
			search: 'var(--theme-color)',
			add: 'var(--theme-color)',
			toggle: 'var(--theme-color)',
			menu: '#0a0a0a',
			close: '#9ca6af',
			closeImage: '#fff',
			file: 'var(--theme-color)',
			paperclip: 'var(--theme-color)',
			closeOutline: '#000',
			closePreview: '#fff',
			send: 'var(--theme-color)',
			sendDisabled: 'var(--bg-grey)',
			emoji: 'var(--theme-color)',
			emojiReaction: 'rgba(0, 0, 0, 0.3)',
			document: 'var(--theme-color)',
			pencil: '#9e9e9e',
			checkmark: '#9e9e9e',
			checkmarkSeen: '#0696c7',
			eye: '#fff',
			dropdownMessage: '#fff',
			dropdownMessageBackground: 'rgba(0, 0, 0, 0.25)',
			dropdownRoom: '#9e9e9e',
			dropdownScroll: '#0a0a0a',
			microphone: 'var(--theme-color)',
			audioPlay: 'var(--theme-color)',
			audioPause: 'var(--theme-color)',
			audioCancel: 'var(--theme-color)',
			audioConfirm: 'var(--theme-color)'
		}
}
