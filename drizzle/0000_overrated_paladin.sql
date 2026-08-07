CREATE TABLE `admin_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`name` text DEFAULT '' NOT NULL,
	`role` text DEFAULT 'editor' NOT NULL,
	`active` integer DEFAULT true NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`deleted_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `admin_users_email_unique` ON `admin_users` (`email`);--> statement-breakpoint
CREATE TABLE `blog_posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`excerpt` text DEFAULT '' NOT NULL,
	`content` text DEFAULT '' NOT NULL,
	`cover_image_url` text DEFAULT '' NOT NULL,
	`author_name` text DEFAULT 'Passageway Consulting' NOT NULL,
	`category` text DEFAULT 'Compassion' NOT NULL,
	`seo_title` text DEFAULT '' NOT NULL,
	`seo_description` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`published_at` text DEFAULT '' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`deleted_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `blog_posts_slug_unique` ON `blog_posts` (`slug`);--> statement-breakpoint
CREATE TABLE `events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`summary` text DEFAULT '' NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`starts_at` text DEFAULT '' NOT NULL,
	`ends_at` text DEFAULT '' NOT NULL,
	`timezone` text DEFAULT 'America/Chicago' NOT NULL,
	`format` text DEFAULT 'Online' NOT NULL,
	`registration_url` text DEFAULT 'https://passagewayconsulting.as.me/' NOT NULL,
	`image_url` text DEFAULT '' NOT NULL,
	`price_label` text DEFAULT '' NOT NULL,
	`capacity_label` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`featured` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`deleted_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `events_slug_unique` ON `events` (`slug`);--> statement-breakpoint
CREATE TABLE `resources` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`category` text DEFAULT 'Guide' NOT NULL,
	`file_url` text DEFAULT '' NOT NULL,
	`image_url` text DEFAULT '' NOT NULL,
	`requires_email` integer DEFAULT false NOT NULL,
	`active` integer DEFAULT true NOT NULL,
	`featured` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`deleted_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `resources_slug_unique` ON `resources` (`slug`);--> statement-breakpoint
CREATE TABLE `services` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`eyebrow` text DEFAULT 'Support' NOT NULL,
	`category` text DEFAULT 'Consulting' NOT NULL,
	`summary` text DEFAULT '' NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`initial_price` text DEFAULT '' NOT NULL,
	`follow_up_price` text DEFAULT '' NOT NULL,
	`price_note` text DEFAULT '' NOT NULL,
	`booking_url` text DEFAULT 'https://passagewayconsulting.as.me/' NOT NULL,
	`active` integer DEFAULT true NOT NULL,
	`featured` integer DEFAULT false NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`deleted_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `services_slug_unique` ON `services` (`slug`);--> statement-breakpoint
CREATE TABLE `site_settings` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text DEFAULT '{}' NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_by` text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `team_members` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`title` text DEFAULT 'Life Consultant' NOT NULL,
	`bio` text DEFAULT '' NOT NULL,
	`credentials` text DEFAULT '' NOT NULL,
	`focus_areas` text DEFAULT '' NOT NULL,
	`image_url` text DEFAULT '' NOT NULL,
	`booking_url` text DEFAULT 'https://passagewayconsulting.as.me/' NOT NULL,
	`active` integer DEFAULT true NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`deleted_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `team_members_slug_unique` ON `team_members` (`slug`);--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`quote` text NOT NULL,
	`name` text DEFAULT '' NOT NULL,
	`attribution` text DEFAULT 'Passageway client' NOT NULL,
	`approved` integer DEFAULT false NOT NULL,
	`featured` integer DEFAULT false NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`deleted_at` text
);
--> statement-breakpoint
INSERT OR IGNORE INTO `admin_users` (`email`, `name`, `role`, `active`) VALUES ('isaacmosesbell@gmail.com', 'Isaac Bell', 'admin', true);
--> statement-breakpoint
INSERT OR IGNORE INTO `services` (`slug`, `name`, `eyebrow`, `category`, `summary`, `description`, `initial_price`, `follow_up_price`, `price_note`, `booking_url`, `active`, `featured`, `sort_order`) VALUES ('online-emotional-health-consulting', 'One-to-one consulting', 'Personal', 'Consulting', 'Personalized support to explore emotional wounds, reclaim your power, and move forward with greater resilience.', 'Personalized support with Hannah or Kimberly, tailored to what you are walking through.', '$100', '$55', 'Initial session and follow-up consultation', 'https://passagewayconsulting.as.me/', true, true, 1);
--> statement-breakpoint
INSERT OR IGNORE INTO `services` (`slug`, `name`, `eyebrow`, `category`, `summary`, `description`, `initial_price`, `follow_up_price`, `price_note`, `booking_url`, `active`, `featured`, `sort_order`) VALUES ('joint-consulting', 'Kimberly + Hannah', 'Combined', 'Consulting', 'Two complementary perspectives in one supportive space, grounded in compassion, regulation, and empowerment.', 'Two complementary perspectives, one supportive space, and a shared commitment to your growth.', '$160', '$110', 'Initial session and follow-up consultation', 'https://passagewayconsulting.as.me/', true, true, 2);
--> statement-breakpoint
INSERT OR IGNORE INTO `services` (`slug`, `name`, `eyebrow`, `category`, `summary`, `description`, `booking_url`, `active`, `featured`, `sort_order`) VALUES ('online-womens-emotional-health-workshops', 'One-day workshops', 'Shared', 'Workshop', 'A brief but impactful experience where learning, honest connection, and shared healing come together.', 'Online experiences blending education, reflection, and meaningful connection.', '/online-womens-emotional-health-workshops', true, false, 3);
--> statement-breakpoint
INSERT OR IGNORE INTO `services` (`slug`, `name`, `eyebrow`, `category`, `summary`, `description`, `booking_url`, `active`, `featured`, `sort_order`) VALUES ('connect-and-empower', 'Three-week programs', 'Transformational', 'Cohort', 'An immersive journey for women ready to grow in community, practice new tools, and make change last.', 'A longer rhythm of learning, conversation, practice, and community.', '/online-womens-emotional-health-workshops#cohorts', true, false, 4);
--> statement-breakpoint
INSERT OR IGNORE INTO `resources` (`slug`, `title`, `description`, `category`, `file_url`, `image_url`, `requires_email`, `active`, `featured`) VALUES ('self-compassion-reflection-guide', 'Self-Compassion Reflection Guide', 'Five gentle practices for softening self-judgment and nurturing warmth toward yourself.', 'Free guide', '/resources/self-compassion-reflection-guide.pdf', '/images/self-compassion-guide.webp', false, true, true);
--> statement-breakpoint
INSERT OR IGNORE INTO `team_members` (`slug`, `name`, `title`, `bio`, `credentials`, `focus_areas`, `image_url`, `booking_url`, `active`, `sort_order`) VALUES ('hannah-spacek', 'Hannah Spacek', 'ND, CHC · Life Consultant', 'Hannah has worked in the wellness field for over ten years and brings lived experience of moving through chronic anxiety, people-pleasing, low self-esteem, and the struggle to have a voice. She guides women beyond limiting beliefs and into self-acceptance, confidence, and freedom.', 'Naturopathic Doctorate · Certified Health Coach · Regenerative Detoxification specialist training', 'Dating, Anxiety, Self-esteem, Empowerment', '/images/hannah-spacek.webp', 'https://passagewayconsulting.as.me/', true, 1);
--> statement-breakpoint
INSERT OR IGNORE INTO `team_members` (`slug`, `name`, `title`, `bio`, `credentials`, `focus_areas`, `image_url`, `booking_url`, `active`, `sort_order`) VALUES ('kimberly', 'Kimberly', 'Life Consultant', 'Kimberly brings more than 30 years of Christian ministry and a deeply lived understanding of healing. She helps women gently untangle trauma, self-doubt, and beliefs that no longer serve them so they can reclaim their voice and move toward a life that feels peaceful and true.', '30+ years ministering to women · Compassion, love and truth', 'Trauma, Self-worth, Voice, Personal freedom', '/images/kimberly.webp', 'https://passagewayconsulting.as.me/', true, 2);
--> statement-breakpoint
INSERT OR IGNORE INTO `site_settings` (`key`, `value`, `updated_by`) VALUES ('homepage', '{"announcementEnabled":false,"announcementTitle":"","announcementBody":"","announcementCtaLabel":"","announcementCtaUrl":""}', 'isaacmosesbell@gmail.com');
