INSERT INTO 'lang' ('initial') 
VALUES ('en'),
       ('es');

INSERT INTO 'user' ('email', 'password', 'is_admin') 
VALUES ('test@gmail.com', '$2b$10$X1HuHO4VJ0fA3K16A4ELt.gdZKwbsHAIFWZbgXyQzImLrCa8yOUZ6', 1); /* Password: 1234 */

INSERT INTO 'books_collection' ('name', 'description', 'user_id') 
VALUES ('Collection 1', 'Esto es collection 1', 1),
       ('Collection 2', 'Esto es collection 2', 1);

INSERT INTO 'book' ('name', 'description', 'filename', 'user_id', 'collection_id') 
VALUES ('book 1', 'Esto es book 1', 'file.pdf', 1, NULL),
       ('book 2', 'Esto es book 2', 'file.pdf', 1, NULL),
       ('book 3', 'Esto es book 3', 'file.pdf', 1, 1);

INSERT INTO 'bookmark' ('page', 'comment', 'book_id') 
VALUES (1, 'Esto es bookmark 1', 1),
       (2, 'Esto es bookmark 2', 1);

INSERT INTO 'refresh_token' ('id', 'token', 'expires_in', 'user_id') 
VALUES (1, '8af486c1-86c2-46f2-98ec-39b1f58bc043', '2020-07-20 22:44:17', 1),
       (2, '36d1c766-d976-4691-882a-dd917390c4e8', '2020-07-20 21:28:08', 1),
       (3, '86275ff3-06fd-4e4d-a744-99ef11c5615e', '2020-07-21 21:28:10', 1),
       (4, '124a962b-d4ed-4796-811b-7c71dec0f1d8', '2020-07-22 21:28:26', 1),
       (5, 'd21eaf4c-5b4c-467c-8cd1-efe0b771d754', '2020-07-23 21:29:49', 1),
       (6, '55520691-3433-43b2-9f29-2eb97c3e971b', '2020-08-12 21:29:50', 1),
       (7, '932c96fa-6f36-48eb-b99a-c85f954ca30f', '2020-08-16 21:30:00', 1),
       (8, '71410894-843c-4778-b8ef-dc82f1c42a4f', '2020-08-19 21:30:12', 1);
