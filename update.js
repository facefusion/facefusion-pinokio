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
					'message': 'git pull'
				}
			},
			{
				method: 'shell.run',
				params:
				{
					message: 'git pull origin next',
					path: 'facefusion'
				}
			},
			{
				method: 'shell.run',
				params:
				{
					message: 'git checkout next',
					path: 'facefusion'
				}
			}
		]
	};

	return config;
};

