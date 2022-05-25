const MIGRATION_NAME = 'add-domain-suffixes';

module.exports = {
    async up(db) {
        try {
            console.log(`Starting migration ${MIGRATION_NAME}`);
            await db.collection('suffixes').insertMany([
                {
                    suffix: 'com ',
                },
                {
                    suffix: 'org ',
                },
                {
                    suffix: 'edu',
                },
                {
                    suffix: 'gov',
                },
                {
                    suffix: 'mil',
                },
                {
                    suffix: 'net',
                },
            ]);
            console.log(`Migration ${MIGRATION_NAME} completed successfully`);
        } catch (err) {
            console.log(`Migration ${MIGRATION_NAME} failed:`, err.message);
        }
    },
};
