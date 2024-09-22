const path = require('path');

module.exports = async kernel =>
{
	const menu = [];

	if (!await kernel.exists(path.resolve(__dirname, '.env')))
	{
		menu.push(
		{
			icon: 'fa-solid fa-plug',
			text: 'Install',
			href: 'install.js',
			params:
			{
				run: true,
				fullscreen: true
			}
		});

		return menu;
	}

	if (!await kernel.running(__dirname, 'run.js') && !await kernel.running(__dirname, 'install.js') && !await kernel.running(__dirname, 'update.js') && !await kernel.running(__dirname, 'reset.js'))
	{
		[
			[ 'fa-solid fa-power-off', 'Run Default', 'Default' ],
			[ 'fa-solid fa-robot', 'Run Default+Jobs', 'Default+Jobs' ],
			[ 'fa-solid fa-gauge', 'Run Benchmark', 'Benchmark' ],
			[ 'fa-solid fa-camera', 'Run Webcam', 'Webcam' ]
		]
		.forEach(([ icon, text, mode ]) =>
		{
			menu.push(
			{
				icon,
				text,
				href: 'run.js',
				params:
				{
					run: true,
					fullscreen: true,
					mode
				}
			});
		});
	}
	if (await kernel.running(__dirname, 'run.js'))
	{
		const memory = await kernel.memory.local[path.resolve(__dirname, 'run.js')];

		if (memory && memory.url && memory.mode)
		{
			menu.push(
			{
				icon: 'fa-solid fa-rocket',
				text: 'UI (' + memory.mode + ')',
				href: memory.url,
				params:
				{
					run: true,
					fullscreen: true
				}
			});
		}
		menu.push(
		{
			icon: 'fa-solid fa-desktop',
			text: 'CLI',
			href: 'run.js',
			params:
			{
				run: true,
				fullscreen: true
			}
		});
	}
	else
	{
		[
			[ 'fa-solid fa-plug', 'Install', 'install.js' ],
			[ 'fa-solid fa-rotate', 'Update', 'update.js' ],
			[ 'fa-regular fa-circle-xmark', 'Reset', 'reset.js' ]
		]
		.forEach(([ icon, text, href ]) =>
		{
			menu.push(
			{
				icon,
				text,
				href,
				params:
				{
					run: true,
					fullscreen: true
				}
			});
		});
	}
	return menu;
};
