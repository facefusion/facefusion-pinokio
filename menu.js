module.exports = async kernel =>
{
	const hasEnv = await kernel.exists(__dirname, 'facefusion', 'env');
	const hasRepo = await kernel.exists(__dirname, 'facefusion');

	let menu = [];

	if (hasEnv && hasRepo)
	{
		if (kernel.running(__dirname, 'start.js'))
		{
			const session = await kernel.require(__dirname, 'session.json');

			menu =
			[
				{
					icon: 'fa-solid fa-spin fa-circle-notch',
					text: 'Running ' + session.mode
				},
				{
					icon: 'fa-solid fa-desktop',
					text: 'Server',
					href: 'start.js',
					params:
					{
						fullscreen: true
					}
				}
			];
			if (session && session.url)
			{
				menu.push(
				{
					icon: 'fa-solid fa-rocket',
					text: 'Open session',
					href: session.url,
					target: '_blank'
				});
			}
			return menu;
		}
		menu =
		[
			{
				icon: 'fa-solid fa-power-off',
				text: 'Launch default',
				href: 'start.js',
				params:
				{
					run: true,
					fullscreen: true,
					mode: 'Default'
				}
			},
			{
				icon: 'fa-solid fa-gauge',
				text: 'Launch benchmark',
				href: 'start.js',
				params:
				{
					run: true,
					fullscreen: true,
					mode: 'Benchmark'
				}
			},
			{
				icon: 'fa-solid fa-camera,
				text: 'Launch webcam',
				href: 'start.js',
				params:
				{
					run: true,
					fullscreen: true,
					mode: 'Webcam'
				}
			},
			{
				icon: 'fa-solid fa-rotate',
				text: 'Update',
				href: 'update.js',
				params:
				{
					run: true,
					fullscreen: true
				}
			}
		];
	}
	else
	{
		menu =
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
	}
	return menu;
};
