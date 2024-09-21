const path = require('path');

module.exports = kernel =>
{
	if (!kernel.exists(__dirname, 'facefusion'))
	{
		const menu =
		[
			{
				icon: 'fa-solid fa-plug',
				text: 'Install',
				href: 'install.js',
				params:
				{
					run: true,
					fullscreen: true
				}
			}
		];

		return menu;
	}

	[
		[ 'fa-solid fa-plug', 'Installing', 'install.js' ],
		[ 'fa-solid fa-rotate', 'Updating', 'update.js' ],
		[ 'fa-regular fa-circle-xmark', 'Resetting', 'reset.js' ]
	]
	.forEach(([ icon, text, href ]) =>
	{
		if (kernel.running(__dirname, href))
		{
			const menu =
			[
				{
					icon,
					text,
					href,
					params:
					{
						run: true,
						fullscreen: true
					}
				}
			];

			return menu;
		}
	});

	const menu = [];

	if (kernel.running(__dirname, 'run.js'))
	{
		const start_path = path.resolve(__dirname, 'run.js');
		const memory = kernel.memory.local[start_path];

		if (memory && memory.url && memory.mode)
		{
			menu.concat(
			[
				{
					icon: 'fa-solid fa-rocket',
					text: 'Open Session',
					href: memory.url
				},
				{
					icon: 'fa-solid fa-desktop',
					text: 'Running (' + memory.mode + ')',
					href: 'run.js',
					params:
					{
						fullscreen: true
					}
				}
			]);
		}
		else
		{
			menu.push(
			{
				icon: 'fa-solid fa-desktop',
				text: 'Run',
				href: 'run.js',
				params:
				{
					fullscreen: true
				}
			});
		}
	}

	[
		[ 'fa-solid fa-power-off', 'Run Default', 'Default' ],
		[ 'fa-solid fa-gauge', 'Run Benchmark', 'Benchmark' ],
		[ 'fa-solid fa-robot', 'Run Jobs', 'Jobs' ],
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

	return menu;
};
