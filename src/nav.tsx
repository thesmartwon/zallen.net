export function Nav() {
	return (
		<nav class="mb-4 font-serif">
			<ul class="flex flex-row items-end gap-4">
				<li class="self-start">
					<a href="/" class="text-xl">zallen</a>
				</li>
				<li class="flex-1" />
				<li>
					<a href="/cv">cv</a>
				</li>
				<li>
					<a href="/feed.xml">rss</a>
				</li>
			</ul>
			<hr class="mt-2" />
		</nav>
	);
}
