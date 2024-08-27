import path from "path";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { en } from "payload/i18n/en";
import {
	HTMLConverterFeature,
	lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";

import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

import { UsersCollection } from "@/cms/collections/Users";
import { MediaCollection } from "@/cms/collections/Media";
import { PagesCollection } from "@/cms/collections/Pages";
import { SocailLinksCollection } from "@/cms/collections/SocialLinks";

export default buildConfig({
	secret: process.env.PAYLOAD_SECRET || "set-a-secret-in-your-env",
	collections: [
		UsersCollection,
		MediaCollection,
		PagesCollection,
		SocailLinksCollection,
	],
	admin: {
		//		autoLogin: process.env.NODE_ENV === "development" && {
		//			email: "dev@payloadcms.com",
		//			password: "test",
		//			prefillOnly: true,
		//		},
	},
	// the type of DB you would like to use
	db: postgresAdapter({
		pool: {
			connectionString: process.env.POSTGRES_URL,
		},
	}),
	plugins: process.env.BLOB_READ_WRITE_TOKEN
		? [
				vercelBlobStorage({
					collections: {
						[MediaCollection.slug]: true,
					},
					token: process.env.BLOB_READ_WRITE_TOKEN || "",
				}),
			]
		: [],
	// richText editor
	editor: lexicalEditor({
		features({ defaultFeatures }) {
			return [...defaultFeatures, HTMLConverterFeature({})];
		},
	}),
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	i18n: {
		supportedLanguages: { en },
	},
	async onInit(payload) {
		const existingUsers = await payload.find({
			collection: "users",
			limit: 1,
		});

		// This is useful for local development
		// so you do not need to create a first-user every time
		if (existingUsers.docs.length === 0) {
			await payload.create({
				collection: "users",
				data: {
					email: process.env.USER_EMAIL || "",
					password: process.env.USER_PASSWORD || "test",
				},
			});
		}
	},
	// Sharp is now an optional dependency -
	// if you want to resize images, crop, set focal point, etc.
	// make sure to install it and pass it to the config.
	sharp,
});
