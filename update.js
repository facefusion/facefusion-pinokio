module.exports = () =>
{
	const config =
	{
		run:
		[
			{
				method: 'shell.run',
				params:
				{
					message: 'conda tos accept --override-channels --channel https://repo.anaconda.com/pkgs/main'
					message: 'conda tos accept --override-channels --channel https://repo.anaconda.com/pkgs/r'
					message: 'conda tos accept --override-channels --channel https://repo.anaconda.com/pkgs/sys2'
				}
			},
			{
				method: 'shell.run',
				params:
				{
					'message': 'git pull'
				}
			},
			{
				method: 'shell.run',
				params:
				{
					message: 'git pull --tags',
					path: 'facefusion'
				}
			},
			{
				method: 'shell.run',
				params:
				{
					message: 'git checkout 3.5.0',
					path: 'facefusion'
				}
			}
		]
	};

	return config;
};
