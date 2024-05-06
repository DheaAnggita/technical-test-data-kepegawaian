SELECT
    e.id AS employee_id,
    e.nik,
    e.name,
    e.is_active,
    ep.gender,
    CONCAT(EXTRACT(YEAR FROM AGE(CURRENT_DATE, ep.date_of_birth)), ' Years Old') AS age,
    ed.name AS school_name,
    ed.level,
  	CONCAT(
		COALESCE(
			(CASE WHEN ep.gender = 'Perempuan' THEN
				(SUM(CASE WHEN ef.relation_status = 'Suami' THEN 1 ELSE 0 END) || ' Suami')
            ELSE NULL END),
            ''
        ),
        COALESCE(
            (CASE WHEN ep.gender = 'Laki-Laki' THEN
                (SUM(CASE WHEN ef.relation_status = 'Istri' THEN 1 ELSE 0 END) || ' Istri')
            ELSE NULL END),
            ''
        ), ', ',
        COALESCE(
            (SUM(CASE WHEN ef.relation_status = 'Anak' THEN 1 ELSE 0 END) || ' Anak'),
            ''
        ), ', ',
        COALESCE(
            (SUM(CASE WHEN ef.relation_status = 'Anak Sambung' THEN 1 ELSE 0 END) || ' Anak Sambung'),
            ''
        )
	) AS family_data
FROM "Employees" e
LEFT JOIN "EmployeeProfiles" ep  ON ep.employee_id = e.id 
LEFT JOIN "Education" ed ON ed.employee_id = e.id 
LEFT JOIN "EmployeeFamilies" ef ON ef.employee_id = e.id 
WHERE e.is_active = true GROUP BY e.id, e.name, ep.gender, e.nik,  ep.date_of_birth, ed.name, ed.level;

