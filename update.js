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
					message: 'git pull origin 2.1.1',
					path: 'facefusion'
				}
			}
		]
	};

	return config;
};

