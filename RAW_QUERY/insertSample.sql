INSERT INTO "Employees" (nik, name, is_active, start_date, end_date, created_at, updated_at)
VALUES ('11012', 'Budi', TRUE, '2022-12-12', '2029-12-12', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('11013', 'Jarot', TRUE, '2021-09-01', '2028-09-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO "Education"  (employee_id, name, level, description, created_by, updated_by, created_at, updated_at)
VALUES (1, 'SMKN 7 Jakarta', 'Sma', 'Sekolah Menengah Atas', 'admin', 'admin', '2022-12-12 00:00:00', '2022-12-12 00:00:00'),
       (2, 'Universitas Negeri Jakarta', 'Strata 1', 'Sarjana', 'admin', 'admin', '2022-12-12 00:00:00', '2022-12-12 00:00:00');

INSERT INTO "EmployeeProfiles"  (employee_id, place_of_birth, date_of_birth, gender, is_married, prof_pict, created_by, updated_by, created_at, updated_at)
VALUES (1, 'Jakarta', '1997-05-02', 'Laki-Laki', 'TRUE', 'admin', 'admin', 'admin', '2022-12-12 00:00:00', '2022-12-12 00:00:00'),
       (2, 'Sukabumi', '1996-05-02', 'Laki-Laki', 'FALSE', 'admin', 'admin', 'admin', '2022-12-12 00:00:00', '2022-12-12 00:00:00');

INSERT INTO "EmployeeFamilies"  (employee_id, name, identifier, job, place_of_birth, date_of_birth, religion, is_life, is_divorced, relation_status, created_by, updated_by, created_at, updated_at)
VALUES (1, 'Marni', '32100594109960002', 'Ibu Rumah Tangga', 'Denpasar', '1995-10-17', 'Islam', 'TRUE', 'FALSE', 'Istri', 'admin', 'admin', '2022-12-12 00:00:00', '2022-12-12 00:00:00'),
       (1, 'Clara', '32100594109020004', 'Pelajar', 'Bangkalan', '2008-10-17', 'Islam', 'TRUE', 'FALSE', 'Anak', 'admin', 'admin', '2022-12-12 00:00:00', '2022-12-12 00:00:00'),
       (1, 'Stephanie', '32100594109020005', 'Pelajar', 'Bangkalan', '2008-10-17', 'Islam', 'TRUE', 'FALSE', 'Anak', 'admin', 'admin', '2022-12-12 00:00:00', '2022-12-12 00:00:00');
