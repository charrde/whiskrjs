// whiskrjs.d.ts

declare module 'whiskrjs' {
	interface ActionButton {
		text: string;
		onClick: () => void;
		styles?: Record<string, string>;
		hoverColor?: string;
		activeColor?: string;
	}

	interface WhiskrOptions {
		message?: string;
		type?: 'success' | 'error' | 'info' | 'warning';
		duration?: number;
		position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' | 'top-center' | 'bottom-center';
		actionButtons?: ActionButton[];
		styles?: Record<string, string>;
		borderColor?: string;
		borderSides?: Array<'top' | 'right' | 'bottom' | 'left'>;
		borderThickness?: Record<string, string>;
		closeButtonStyle?: 'left' | 'right' | 'bar' | 'none';
		closeButtonColor?: string;
		closeButtonContent?: string;
		textAlign?: 'left' | 'center' | 'right';
		customClass?: string;
		animationType?: 'slide' | 'fade' | 'zoom' | 'bounce' | 'flip' | 'rotate' | 'none';
		animationDuration?: number;
		animationEase?: string;
		pauseOnHover?: boolean;
		onClose?: () => void;
		html?: string;
		focus?: boolean;
		width?: string;
		textOverflow?: 'wrap' | 'ellipsis' | 'scroll';
		fontFamily?: string;
	}

	interface GlobalOptions {
		maxToasts?: number;
		queue?: boolean;
		fontFamily?: string;
	}

	interface Whiskr {
		show: (options: WhiskrOptions) => void;
		settings: (options: GlobalOptions) => void;
	}

	const whiskr: Whiskr;
	export default whiskr;
}
