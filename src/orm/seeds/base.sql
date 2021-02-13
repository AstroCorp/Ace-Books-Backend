INSERT INTO 'lang' ('initial') 
VALUES ('en'),
       ('es');

/* Password: 123456 */
INSERT INTO 'user' ('email', 'password', 'verification_code') 
VALUES ('test@test.test', '$2b$10$6SiGOD64GFLtrhip7hFa8.QbyCJ.7vLYshmunIth/Bfkkoud1Et9C', '6d4ef611-6fb1-4744-a7f7-32948bc06512');

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
