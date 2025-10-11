export function useMDXComponents() {
	return {
		wrapper: ({ children }) => <div className='container mx-auto px-4 py-8 prose max-w-none'>{children}</div>,
	};
}
