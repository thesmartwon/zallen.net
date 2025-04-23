export function UnicodeTable(props: { from: string; length: number }) {
	const chars: number[] = [];
	const cp = props.from.codePointAt(0) ?? 500;
	for (let i = 0; i < props.length; i++) {
		chars.push(cp + i);
	}
	return (
		<div class="grid grid-cols-8 gap-4 p-4">
			{chars.map((c) => (
				<div class="flex flex-col items-center">
					<span>{String.fromCodePoint(c)}</span>
					<div>{c}</div>
				</div>
			))}
		</div>
	);
}
