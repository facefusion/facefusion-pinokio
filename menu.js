const path = require('path');

module.exports = async kernel =>
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
		[ 'Installing', 'install.js' ],
		[ 'Updating', 'update.js' ],
		[ 'Resetting', 'reset.js' ]
	]
	.forEach(([ text, href ]) =>
	{
		if (kernel.running(__dirname, script))
		{
			const menu =
			[
				{
					icon: 'fa-solid fa-spinner',
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

	if (kernel.running(__dirname, 'start.js'))
	{
		const start_path = path.resolve(__dirname, 'start.js');
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
					text: 'Server (' + memory.mode + ')',
					href: 'start.js',
					params:
					{
						fullscreen: true
					}
				}
			]);
		}
		else
		{
			menu.concat(
			[
				{
					icon: 'fa-solid fa-desktop',
					text: 'Server',
					href: 'start.js',
					params:
					{
						fullscreen: true
					}
				}
			]);
		}
	}

	[
		[ 'fa-solid fa-plug', 'Install', 'install.js' ],
		[ 'fa-solid fa-rotate', 'Update', 'update.js' ],
		[ 'fa-regular fa-circle-xmark', 'Reset', 'reset.js' ]
	]
	.forEach(([ icon, text, href ]) =>
	{
		menu.concat(
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
		]);
	});

	[
		[ 'fa-solid fa-power-off', 'Launch Default', 'Default' ],
		[ 'fa-solid fa-gauge', 'Launch Benchmark', 'Benchmark' ],
		[ 'fa-solid fa-robot', 'Launch Jobs', 'Jobs' ],
		[ 'fa-solid fa-camera', 'Launch Webcam', 'Webcam' ]
	]
	.forEach(([ icon, text, mode ]) =>
	{
		menu.push({
			icon,
			text,
			href: 'start.js',
			params:
			{
				run: true,
				fullscreen: true,
				mode
			}
		});
	});

	return menu;
};
