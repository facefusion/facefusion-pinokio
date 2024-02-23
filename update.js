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
					message: 'git pull',
					path: 'facefusion'
				}
			},
			{
				method: 'shell.run',
				params:
				{
					message: 'git checkout master',
					path: 'facefusion'
				}
			}
		]
	};

	return config;
};

