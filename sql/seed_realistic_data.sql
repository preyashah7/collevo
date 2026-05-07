-- Collevo Realistic Data - Courses, Placements, Reviews, Rankings
-- Run this in Supabase SQL editor to populate realistic data

-- ========================================
-- 1. COURSES DATA (3-5 courses per college)
-- ========================================

INSERT INTO courses (college_id, name, degree_type, degree_level, stream, specialization, duration_years, program_type, total_fees, fees_per_year, eligibility, median_salary_lpa, total_seats) 
SELECT id, 'Bachelor of Technology', 'BTech', 'UG', 'Engineering', 'Computer Science', 4, 'full-time', 1600000, 400000, '12th Pass + JEE Main', 18.5, 180 FROM colleges WHERE slug = 'iit-delhi' LIMIT 1;

INSERT INTO courses (college_id, name, degree_type, degree_level, stream, specialization, duration_years, program_type, total_fees, fees_per_year, eligibility, median_salary_lpa, total_seats) 
SELECT id, 'Bachelor of Technology', 'BTech', 'UG', 'Engineering', 'Electrical Engineering', 4, 'full-time', 1600000, 400000, '12th Pass + JEE Main', 16.5, 150 FROM colleges WHERE slug = 'iit-delhi' LIMIT 1;

INSERT INTO courses (college_id, name, degree_type, degree_level, stream, specialization, duration_years, program_type, total_fees, fees_per_year, eligibility, median_salary_lpa, total_seats) 
SELECT id, 'Bachelor of Technology', 'BTech', 'UG', 'Engineering', 'Mechanical Engineering', 4, 'full-time', 1600000, 400000, '12th Pass + JEE Main', 15.0, 150 FROM colleges WHERE slug = 'iit-delhi' LIMIT 1;

INSERT INTO courses (college_id, name, degree_type, degree_level, stream, specialization, duration_years, program_type, total_fees, fees_per_year, eligibility, median_salary_lpa, total_seats) 
SELECT id, 'Bachelor of Technology', 'BTech', 'UG', 'Engineering', 'Civil Engineering', 4, 'full-time', 1600000, 400000, '12th Pass + JEE Main', 12.5, 120 FROM colleges WHERE slug = 'iit-delhi' LIMIT 1;

-- IIT Bombay
INSERT INTO courses (college_id, name, degree_type, degree_level, stream, specialization, duration_years, program_type, total_fees, fees_per_year, eligibility, median_salary_lpa, total_seats) 
SELECT id, 'Bachelor of Technology', 'BTech', 'UG', 'Engineering', 'Computer Science', 4, 'full-time', 1600000, 400000, '12th Pass + JEE Main', 19.0, 200 FROM colleges WHERE slug = 'iit-bombay' LIMIT 1;

INSERT INTO courses (college_id, name, degree_type, degree_level, stream, specialization, duration_years, program_type, total_fees, fees_per_year, eligibility, median_salary_lpa, total_seats) 
SELECT id, 'Bachelor of Technology', 'BTech', 'UG', 'Engineering', 'Electrical Engineering', 4, 'full-time', 1600000, 400000, '12th Pass + JEE Main', 17.0, 160 FROM colleges WHERE slug = 'iit-bombay' LIMIT 1;

INSERT INTO courses (college_id, name, degree_type, degree_level, stream, specialization, duration_years, program_type, total_fees, fees_per_year, eligibility, median_salary_lpa, total_seats) 
SELECT id, 'Bachelor of Technology', 'BTech', 'UG', 'Engineering', 'Chemical Engineering', 4, 'full-time', 1600000, 400000, '12th Pass + JEE Main', 16.0, 140 FROM colleges WHERE slug = 'iit-bombay' LIMIT 1;

-- IIT Madras
INSERT INTO courses (college_id, name, degree_type, degree_level, stream, specialization, duration_years, program_type, total_fees, fees_per_year, eligibility, median_salary_lpa, total_seats) 
SELECT id, 'Bachelor of Technology', 'BTech', 'UG', 'Engineering', 'Computer Science', 4, 'full-time', 1600000, 400000, '12th Pass + JEE Main', 18.0, 180 FROM colleges WHERE slug = 'iit-madras' LIMIT 1;

INSERT INTO courses (college_id, name, degree_type, degree_level, stream, specialization, duration_years, program_type, total_fees, fees_per_year, eligibility, median_salary_lpa, total_seats) 
SELECT id, 'Bachelor of Technology', 'BTech', 'UG', 'Engineering', 'Electrical Engineering', 4, 'full-time', 1600000, 400000, '12th Pass + JEE Main', 16.5, 155 FROM colleges WHERE slug = 'iit-madras' LIMIT 1;

INSERT INTO courses (college_id, name, degree_type, degree_level, stream, specialization, duration_years, program_type, total_fees, fees_per_year, eligibility, median_salary_lpa, total_seats) 
SELECT id, 'Bachelor of Technology', 'BTech', 'UG', 'Engineering', 'Aerospace Engineering', 4, 'full-time', 1600000, 400000, '12th Pass + JEE Main', 15.5, 80 FROM colleges WHERE slug = 'iit-madras' LIMIT 1;

-- IIT Kanpur
INSERT INTO courses (college_id, name, degree_type, degree_level, stream, specialization, duration_years, program_type, total_fees, fees_per_year, eligibility, median_salary_lpa, total_seats) 
SELECT id, 'Bachelor of Technology', 'BTech', 'UG', 'Engineering', 'Computer Science', 4, 'full-time', 1600000, 400000, '12th Pass + JEE Main', 17.5, 170 FROM colleges WHERE slug = 'iit-kanpur' LIMIT 1;

INSERT INTO courses (college_id, name, degree_type, degree_level, stream, specialization, duration_years, program_type, total_fees, fees_per_year, eligibility, median_salary_lpa, total_seats) 
SELECT id, 'Bachelor of Technology', 'BTech', 'UG', 'Engineering', 'Mechanical Engineering', 4, 'full-time', 1600000, 400000, '12th Pass + JEE Main', 15.5, 150 FROM colleges WHERE slug = 'iit-kanpur' LIMIT 1;

-- Delhi University
INSERT INTO courses (college_id, name, degree_type, degree_level, stream, specialization, duration_years, program_type, total_fees, fees_per_year, eligibility, median_salary_lpa, total_seats) 
SELECT id, 'Bachelor of Science', 'BSc', 'UG', 'Science', 'Physics', 3, 'full-time', 300000, 100000, '12th Pass', 6.5, 200 FROM colleges WHERE slug = 'delhi-university' LIMIT 1;

INSERT INTO courses (college_id, name, degree_type, degree_level, stream, specialization, duration_years, program_type, total_fees, fees_per_year, eligibility, median_salary_lpa, total_seats) 
SELECT id, 'Bachelor of Science', 'BSc', 'UG', 'Science', 'Mathematics', 3, 'full-time', 300000, 100000, '12th Pass', 5.5, 180 FROM colleges WHERE slug = 'delhi-university' LIMIT 1;

INSERT INTO courses (college_id, name, degree_type, degree_level, stream, specialization, duration_years, program_type, total_fees, fees_per_year, eligibility, median_salary_lpa, total_seats) 
SELECT id, 'Bachelor of Arts', 'BA', 'UG', 'Humanities', 'English', 3, 'full-time', 200000, 70000, '12th Pass', 4.5, 300 FROM colleges WHERE slug = 'delhi-university' LIMIT 1;

-- BITS Pilani
INSERT INTO courses (college_id, name, degree_type, degree_level, stream, specialization, duration_years, program_type, total_fees, fees_per_year, eligibility, median_salary_lpa, total_seats) 
SELECT id, 'Bachelor of Engineering', 'BE', 'UG', 'Engineering', 'Computer Science', 4, 'full-time', 2400000, 600000, '12th Pass + BITSAT', 16.0, 300 FROM colleges WHERE slug = 'bits-pilani' LIMIT 1;

INSERT INTO courses (college_id, name, degree_type, degree_level, stream, specialization, duration_years, program_type, total_fees, fees_per_year, eligibility, median_salary_lpa, total_seats) 
SELECT id, 'Bachelor of Engineering', 'BE', 'UG', 'Engineering', 'Electrical & Electronics', 4, 'full-time', 2400000, 600000, '12th Pass + BITSAT', 14.5, 250 FROM colleges WHERE slug = 'bits-pilani' LIMIT 1;

INSERT INTO courses (college_id, name, degree_type, degree_level, stream, specialization, duration_years, program_type, total_fees, fees_per_year, eligibility, median_salary_lpa, total_seats) 
SELECT id, 'Bachelor of Science', 'BSc', 'UG', 'Science', 'Physics', 3, 'full-time', 1800000, 600000, '12th Pass + BITSAT', 8.0, 150 FROM colleges WHERE slug = 'bits-pilani' LIMIT 1;

-- Manipal University
INSERT INTO courses (college_id, name, degree_type, degree_level, stream, specialization, duration_years, program_type, total_fees, fees_per_year, eligibility, median_salary_lpa, total_seats) 
SELECT id, 'Bachelor of Technology', 'BTech', 'UG', 'Engineering', 'Computer Science', 4, 'full-time', 2000000, 500000, '12th Pass + JEE Main', 12.0, 250 FROM colleges WHERE slug = 'manipal-university' LIMIT 1;

INSERT INTO courses (college_id, name, degree_type, degree_level, stream, specialization, duration_years, program_type, total_fees, fees_per_year, eligibility, median_salary_lpa, total_seats) 
SELECT id, 'Bachelor of Technology', 'BTech', 'UG', 'Engineering', 'Mechanical Engineering', 4, 'full-time', 2000000, 500000, '12th Pass + JEE Main', 10.5, 200 FROM colleges WHERE slug = 'manipal-university' LIMIT 1;

-- VIT Vellore
INSERT INTO courses (college_id, name, degree_type, degree_level, stream, specialization, duration_years, program_type, total_fees, fees_per_year, eligibility, median_salary_lpa, total_seats) 
SELECT id, 'Bachelor of Technology', 'BTech', 'UG', 'Engineering', 'Computer Science', 4, 'full-time', 1800000, 450000, '12th Pass + VITEEE', 11.5, 280 FROM colleges WHERE slug = 'vit-vellore' LIMIT 1;

INSERT INTO courses (college_id, name, degree_type, degree_level, stream, specialization, duration_years, program_type, total_fees, fees_per_year, eligibility, median_salary_lpa, total_seats) 
SELECT id, 'Bachelor of Technology', 'BTech', 'UG', 'Engineering', 'Electronics & Communication', 4, 'full-time', 1800000, 450000, '12th Pass + VITEEE', 10.0, 220 FROM colleges WHERE slug = 'vit-vellore' LIMIT 1;

-- Add courses for remaining colleges with 3 courses each
INSERT INTO courses (college_id, name, degree_type, degree_level, stream, specialization, duration_years, program_type, total_fees, fees_per_year, eligibility, median_salary_lpa, total_seats) 
SELECT id, 'Bachelor of Technology', 'BTech', 'UG', 'Engineering', 'Computer Science', 4, 'full-time', 1200000, 300000, '12th Pass + JEE Main', 11.0, 200 FROM colleges WHERE slug IN ('jnu', 'amity-university', 'srm-university', 'lovely-professional', 'shobhit-university', 'christ-university', 'ashoka-university', 'symbiosis-pune', 'bhatnagar-university', 'arya-college')
ORDER BY slug;

INSERT INTO courses (college_id, name, degree_type, degree_level, stream, specialization, duration_years, program_type, total_fees, fees_per_year, eligibility, median_salary_lpa, total_seats) 
SELECT id, 'Bachelor of Business Administration', 'BBA', 'UG', 'Commerce', 'Management', 3, 'full-time', 900000, 300000, '12th Pass', 7.5, 250 FROM colleges WHERE slug IN ('jnu', 'amity-university', 'srm-university', 'lovely-professional', 'shobhit-university', 'christ-university', 'ashoka-university', 'symbiosis-pune', 'bhatnagar-university', 'arya-college')
ORDER BY slug;

INSERT INTO courses (college_id, name, degree_type, degree_level, stream, specialization, duration_years, program_type, total_fees, fees_per_year, eligibility, median_salary_lpa, total_seats) 
SELECT id, 'Bachelor of Science', 'BSc', 'UG', 'Science', 'Data Science', 3, 'full-time', 800000, 270000, '12th Pass', 8.5, 180 FROM colleges WHERE slug IN ('jnu', 'amity-university', 'srm-university', 'lovely-professional', 'shobhit-university', 'christ-university', 'ashoka-university', 'symbiosis-pune', 'bhatnagar-university', 'arya-college')
ORDER BY slug;

-- ========================================
-- 2. COURSE EXAMS (Link courses to entrance exams)
-- ========================================

INSERT INTO course_exams (course_id, exam_name)
SELECT id, 'JEE Main' FROM courses WHERE degree_level = 'UG' AND stream = 'Engineering' LIMIT 50;

INSERT INTO course_exams (course_id, exam_name)
SELECT id, 'BITSAT' FROM courses WHERE specialization LIKE '%Computer%' AND (SELECT name FROM colleges WHERE colleges.id = courses.college_id LIMIT 1) LIKE '%BITS%' LIMIT 10;

INSERT INTO course_exams (course_id, exam_name)
SELECT id, 'VITEEE' FROM courses WHERE specialization LIKE '%Computer%' AND (SELECT name FROM colleges WHERE colleges.id = courses.college_id LIMIT 1) LIKE '%VIT%' LIMIT 10;

INSERT INTO course_exams (course_id, exam_name)
SELECT id, 'Merit Based' FROM courses WHERE degree_level = 'UG' AND stream IN ('Commerce', 'Humanities', 'Science') AND stream NOT IN ('Engineering') LIMIT 50;

-- ========================================
-- 3. PLACEMENT DATA (2022-2024)
-- ========================================

-- IIT Delhi Placements
INSERT INTO placements (college_id, year, avg_package_lpa, highest_package_cr, students_placed, placement_percent, companies_count, top_recruiters)
SELECT id, 2024, 21.5, 185, 1100, 98.2, 275, ARRAY['Google', 'Microsoft', 'Amazon', 'Goldman Sachs', 'McKinsey', 'Apple', 'Meta', 'Flipkart', 'Jio', 'JP Morgan'] FROM colleges WHERE slug = 'iit-delhi' LIMIT 1;

INSERT INTO placements (college_id, year, avg_package_lpa, highest_package_cr, students_placed, placement_percent, companies_count, top_recruiters)
SELECT id, 2023, 20.8, 175, 1050, 97.5, 260, ARRAY['Google', 'Microsoft', 'Amazon', 'Goldman Sachs', 'Adobe', 'Uber', 'Flipkart'] FROM colleges WHERE slug = 'iit-delhi' LIMIT 1;

INSERT INTO placements (college_id, year, avg_package_lpa, highest_package_cr, students_placed, placement_percent, companies_count, top_recruiters)
SELECT id, 2022, 18.5, 160, 1000, 96.8, 250, ARRAY['Google', 'Microsoft', 'Amazon', 'Oracle', 'Directi'] FROM colleges WHERE slug = 'iit-delhi' LIMIT 1;

-- IIT Bombay Placements
INSERT INTO placements (college_id, year, avg_package_lpa, highest_package_cr, students_placed, placement_percent, companies_count, top_recruiters)
SELECT id, 2024, 22.0, 195, 1200, 98.5, 290, ARRAY['Google', 'Microsoft', 'Amazon', 'McKinsey', 'Goldman Sachs', 'Apple', 'Meta', 'JP Morgan', 'Jane Street'] FROM colleges WHERE slug = 'iit-bombay' LIMIT 1;

INSERT INTO placements (college_id, year, avg_package_lpa, highest_package_cr, students_placed, placement_percent, companies_count, top_recruiters)
SELECT id, 2023, 21.0, 185, 1150, 97.8, 275, ARRAY['Google', 'Microsoft', 'Amazon', 'McKinsey', 'Goldman Sachs'] FROM colleges WHERE slug = 'iit-bombay' LIMIT 1;

INSERT INTO placements (college_id, year, avg_package_lpa, highest_package_cr, students_placed, placement_percent, companies_count, top_recruiters)
SELECT id, 2022, 19.5, 175, 1100, 97.0, 260, ARRAY['Google', 'Microsoft', 'Amazon'] FROM colleges WHERE slug = 'iit-bombay' LIMIT 1;

-- IIT Madras Placements
INSERT INTO placements (college_id, year, avg_package_lpa, highest_package_cr, students_placed, placement_percent, companies_count, top_recruiters)
SELECT id, 2024, 20.5, 180, 950, 98.0, 250, ARRAY['Google', 'Microsoft', 'Amazon', 'Nvidia', 'Apple', 'Tesla', 'JP Morgan'] FROM colleges WHERE slug = 'iit-madras' LIMIT 1;

INSERT INTO placements (college_id, year, avg_package_lpa, highest_package_cr, students_placed, placement_percent, companies_count, top_recruiters)
SELECT id, 2023, 19.5, 170, 920, 97.2, 240, ARRAY['Google', 'Microsoft', 'Amazon'] FROM colleges WHERE slug = 'iit-madras' LIMIT 1;

INSERT INTO placements (college_id, year, avg_package_lpa, highest_package_cr, students_placed, placement_percent, companies_count, top_recruiters)
SELECT id, 2022, 17.5, 160, 900, 96.5, 230, ARRAY['Google', 'Microsoft'] FROM colleges WHERE slug = 'iit-madras' LIMIT 1;

-- IIT Kanpur Placements
INSERT INTO placements (college_id, year, avg_package_lpa, highest_package_cr, students_placed, placement_percent, companies_count, top_recruiters)
SELECT id, 2024, 19.5, 170, 850, 97.8, 240, ARRAY['Microsoft', 'Amazon', 'Goldman Sachs', 'Morgan Stanley', 'JP Morgan'] FROM colleges WHERE slug = 'iit-kanpur' LIMIT 1;

INSERT INTO placements (college_id, year, avg_package_lpa, highest_package_cr, students_placed, placement_percent, companies_count, top_recruiters)
SELECT id, 2023, 18.5, 160, 820, 97.0, 230, ARRAY['Microsoft', 'Amazon', 'Goldman Sachs'] FROM colleges WHERE slug = 'iit-kanpur' LIMIT 1;

INSERT INTO placements (college_id, year, avg_package_lpa, highest_package_cr, students_placed, placement_percent, companies_count, top_recruiters)
SELECT id, 2022, 16.5, 150, 800, 96.2, 220, ARRAY['Microsoft', 'Amazon'] FROM colleges WHERE slug = 'iit-kanpur' LIMIT 1;

-- Delhi University Placements
INSERT INTO placements (college_id, year, avg_package_lpa, highest_package_cr, students_placed, placement_percent, companies_count, top_recruiters)
SELECT id, 2024, 8.5, 35, 2000, 78.5, 120, ARRAY['Infosys', 'TCS', 'Accenture', 'ICICI Bank', 'HDFC Bank', 'Deloitte'] FROM colleges WHERE slug = 'delhi-university' LIMIT 1;

INSERT INTO placements (college_id, year, avg_package_lpa, highest_package_cr, students_placed, placement_percent, companies_count, top_recruiters)
SELECT id, 2023, 8.0, 32, 1900, 76.5, 115, ARRAY['Infosys', 'TCS', 'Accenture'] FROM colleges WHERE slug = 'delhi-university' LIMIT 1;

INSERT INTO placements (college_id, year, avg_package_lpa, highest_package_cr, students_placed, placement_percent, companies_count, top_recruiters)
SELECT id, 2022, 7.5, 30, 1850, 75.0, 110, ARRAY['Infosys', 'TCS'] FROM colleges WHERE slug = 'delhi-university' LIMIT 1;

-- BITS Pilani Placements
INSERT INTO placements (college_id, year, avg_package_lpa, highest_package_cr, students_placed, placement_percent, companies_count, top_recruiters)
SELECT id, 2024, 15.5, 120, 1350, 96.5, 220, ARRAY['Google', 'Microsoft', 'Amazon', 'Adobe', 'Uber', 'Flipkart', 'Swiggy'] FROM colleges WHERE slug = 'bits-pilani' LIMIT 1;

INSERT INTO placements (college_id, year, avg_package_lpa, highest_package_cr, students_placed, placement_percent, companies_count, top_recruiters)
SELECT id, 2023, 14.5, 110, 1300, 95.8, 210, ARRAY['Google', 'Microsoft', 'Amazon', 'Adobe'] FROM colleges WHERE slug = 'bits-pilani' LIMIT 1;

INSERT INTO placements (college_id, year, avg_package_lpa, highest_package_cr, students_placed, placement_percent, companies_count, top_recruiters)
SELECT id, 2022, 13.5, 100, 1250, 95.0, 200, ARRAY['Google', 'Microsoft', 'Amazon'] FROM colleges WHERE slug = 'bits-pilani' LIMIT 1;

-- Manipal University Placements
INSERT INTO placements (college_id, year, avg_package_lpa, highest_package_cr, students_placed, placement_percent, companies_count, top_recruiters)
SELECT id, 2024, 11.0, 80, 1100, 92.5, 180, ARRAY['Infosys', 'TCS', 'Cognizant', 'Capgemini', 'Flipkart'] FROM colleges WHERE slug = 'manipal-university' LIMIT 1;

INSERT INTO placements (college_id, year, avg_package_lpa, highest_package_cr, students_placed, placement_percent, companies_count, top_recruiters)
SELECT id, 2023, 10.5, 75, 1050, 91.5, 170, ARRAY['Infosys', 'TCS', 'Cognizant'] FROM colleges WHERE slug = 'manipal-university' LIMIT 1;

INSERT INTO placements (college_id, year, avg_package_lpa, highest_package_cr, students_placed, placement_percent, companies_count, top_recruiters)
SELECT id, 2022, 10.0, 70, 1000, 90.5, 160, ARRAY['Infosys', 'TCS'] FROM colleges WHERE slug = 'manipal-university' LIMIT 1;

-- VIT Vellore Placements
INSERT INTO placements (college_id, year, avg_package_lpa, highest_package_cr, students_placed, placement_percent, companies_count, top_recruiters)
SELECT id, 2024, 10.5, 75, 1200, 91.0, 175, ARRAY['Infosys', 'TCS', 'Cognizant', 'Wipro', 'Amazon'] FROM colleges WHERE slug = 'vit-vellore' LIMIT 1;

INSERT INTO placements (college_id, year, avg_package_lpa, highest_package_cr, students_placed, placement_percent, companies_count, top_recruiters)
SELECT id, 2023, 10.0, 70, 1150, 90.0, 165, ARRAY['Infosys', 'TCS', 'Cognizant'] FROM colleges WHERE slug = 'vit-vellore' LIMIT 1;

INSERT INTO placements (college_id, year, avg_package_lpa, highest_package_cr, students_placed, placement_percent, companies_count, top_recruiters)
SELECT id, 2022, 9.5, 65, 1100, 89.0, 155, ARRAY['Infosys', 'TCS'] FROM colleges WHERE slug = 'vit-vellore' LIMIT 1;

-- Add placements for remaining colleges (2024 only for brevity)
INSERT INTO placements (college_id, year, avg_package_lpa, highest_package_cr, students_placed, placement_percent, companies_count, top_recruiters)
SELECT id, 2024, 9.5, 60, 800, 85.5, 140, ARRAY['Infosys', 'TCS', 'Cognizant', 'Wipro'] FROM colleges WHERE slug IN ('jnu', 'amity-university', 'srm-university', 'lovely-professional', 'shobhit-university', 'christ-university', 'ashoka-university', 'symbiosis-pune', 'bhatnagar-university', 'arya-college')
ORDER BY slug;

-- ========================================
-- 4. RANKINGS DATA (NIRF Rankings)
-- ========================================

-- First, check what colleges exist and assign rankings using a temp approach
INSERT INTO rankings (college_id, agency, rank, total_ranked, stream, year)
SELECT id, 'NIRF', 4, 100, 'Engineering', 2024 FROM colleges WHERE slug = 'iit-delhi' LIMIT 1;

INSERT INTO rankings (college_id, agency, rank, total_ranked, stream, year)
SELECT id, 'NIRF', 3, 100, 'Engineering', 2024 FROM colleges WHERE slug = 'iit-bombay' LIMIT 1;

INSERT INTO rankings (college_id, agency, rank, total_ranked, stream, year)
SELECT id, 'NIRF', 1, 100, 'Engineering', 2024 FROM colleges WHERE slug = 'iit-madras' LIMIT 1;

INSERT INTO rankings (college_id, agency, rank, total_ranked, stream, year)
SELECT id, 'NIRF', 5, 100, 'Engineering', 2024 FROM colleges WHERE slug = 'iit-kanpur' LIMIT 1;

INSERT INTO rankings (college_id, agency, rank, total_ranked, stream, year)
SELECT id, 'NIRF', 15, 100, 'Engineering', 2024 FROM colleges WHERE slug = 'bits-pilani' LIMIT 1;

INSERT INTO rankings (college_id, agency, rank, total_ranked, stream, year)
SELECT id, 'NIRF', 32, 100, 'Engineering', 2024 FROM colleges WHERE slug = 'manipal-university' LIMIT 1;

INSERT INTO rankings (college_id, agency, rank, total_ranked, stream, year)
SELECT id, 'NIRF', 28, 100, 'Engineering', 2024 FROM colleges WHERE slug = 'vit-vellore' LIMIT 1;

INSERT INTO rankings (college_id, agency, rank, total_ranked, stream, year)
SELECT id, 'NIRF', 12, 100, 'Overall', 2024 FROM colleges WHERE slug = 'delhi-university' LIMIT 1;

INSERT INTO rankings (college_id, agency, rank, total_ranked, stream, year)
SELECT id, 'NIRF', 20, 100, 'Overall', 2024 FROM colleges WHERE slug = 'jnu' LIMIT 1;

INSERT INTO rankings (college_id, agency, rank, total_ranked, stream, year)
SELECT id, 'NIRF', 45, 100, 'Engineering', 2024 FROM colleges WHERE slug = 'amity-university' LIMIT 1;

INSERT INTO rankings (college_id, agency, rank, total_ranked, stream, year)
SELECT id, 'NIRF', 38, 100, 'Engineering', 2024 FROM colleges WHERE slug = 'srm-university' LIMIT 1;

INSERT INTO rankings (college_id, agency, rank, total_ranked, stream, year)
SELECT id, 'NIRF', 50, 100, 'Engineering', 2024 FROM colleges WHERE slug = 'lovely-professional' LIMIT 1;

INSERT INTO rankings (college_id, agency, rank, total_ranked, stream, year)
SELECT id, 'NIRF', 65, 100, 'Engineering', 2024 FROM colleges WHERE slug = 'shobhit-university' LIMIT 1;

INSERT INTO rankings (college_id, agency, rank, total_ranked, stream, year)
SELECT id, 'NIRF', 55, 100, 'Overall', 2024 FROM colleges WHERE slug = 'christ-university' LIMIT 1;

INSERT INTO rankings (college_id, agency, rank, total_ranked, stream, year)
SELECT id, 'NIRF', 35, 100, 'Overall', 2024 FROM colleges WHERE slug = 'ashoka-university' LIMIT 1;

INSERT INTO rankings (college_id, agency, rank, total_ranked, stream, year)
SELECT id, 'NIRF', 40, 100, 'Overall', 2024 FROM colleges WHERE slug = 'symbiosis-pune' LIMIT 1;

INSERT INTO rankings (college_id, agency, rank, total_ranked, stream, year)
SELECT id, 'NIRF', 75, 100, 'Engineering', 2024 FROM colleges WHERE slug = 'bhatnagar-university' LIMIT 1;

INSERT INTO rankings (college_id, agency, rank, total_ranked, stream, year)
SELECT id, 'NIRF', 80, 100, 'Engineering', 2024 FROM colleges WHERE slug = 'arya-college' LIMIT 1;

-- ========================================
-- 5. REVIEWS DATA (Realistic reviews)
-- ========================================

-- IIT Delhi Reviews
INSERT INTO reviews (college_id, reviewer_name, course_studied, batch_year, overall_rating, academics_rating, faculty_rating, campus_rating, placement_rating, infrastructure_rating, what_i_liked, what_i_didnt_like, placement_experience, body_text, is_verified)
SELECT id, 'Arjun Sharma', 'Computer Science', 2020, 4.8, 4.9, 4.7, 4.6, 4.9, 4.8, ARRAY['World class faculty', 'Excellent placements', 'Top tier companies'], ARRAY['High competition', 'Strict grading'], 'Placed at Google with 24 LPA', 'One of the best engineering colleges in India. Faculty members are experts in their fields. Placements are exceptional with top companies visiting campus.', true FROM colleges WHERE slug = 'iit-delhi' LIMIT 1;

INSERT INTO reviews (college_id, reviewer_name, course_studied, batch_year, overall_rating, academics_rating, faculty_rating, campus_rating, placement_rating, infrastructure_rating, what_i_liked, what_i_didnt_like, placement_experience, body_text, is_verified)
SELECT id, 'Priya Verma', 'Electrical Engineering', 2021, 4.6, 4.7, 4.5, 4.4, 4.8, 4.6, ARRAY['Amazing labs', 'Good infrastructure', 'Industry connections'], ARRAY['Expensive mess', 'Limited sports facilities'], 'Placed at Goldman Sachs with 28 LPA', 'Great institution with strong academics and placements. Infrastructure is world-class.', true FROM colleges WHERE slug = 'iit-delhi' LIMIT 1;

INSERT INTO reviews (college_id, reviewer_name, course_studied, batch_year, overall_rating, academics_rating, faculty_rating, campus_rating, placement_rating, infrastructure_rating, what_i_liked, what_i_didnt_like, placement_experience, body_text, is_verified)
SELECT id, 'Rohit Singh', 'Mechanical Engineering', 2019, 4.4, 4.5, 4.3, 4.2, 4.6, 4.4, ARRAY['Good professors', 'Campus location'], ARRAY['Heavy course load', 'Competition'], 'Placed at Flipkart with 18 LPA', 'Good experience overall. Placements are strong.', false FROM colleges WHERE slug = 'iit-delhi' LIMIT 1;

-- IIT Bombay Reviews
INSERT INTO reviews (college_id, reviewer_name, course_studied, batch_year, overall_rating, academics_rating, faculty_rating, campus_rating, placement_rating, infrastructure_rating, what_i_liked, what_i_didnt_like, placement_experience, body_text, is_verified)
SELECT id, 'Kavya Iyer', 'Computer Science', 2021, 4.9, 4.9, 4.8, 4.7, 4.9, 4.9, ARRAY['Best in country', 'Fantastic placements', 'Great campus'], ARRAY['Competitive environment'], 'Placed at Microsoft with 26 LPA', 'IITB is arguably the best engineering college in the country. Everything here is top-notch.', true FROM colleges WHERE slug = 'iit-bombay' LIMIT 1;

INSERT INTO reviews (college_id, reviewer_name, course_studied, batch_year, overall_rating, academics_rating, faculty_rating, campus_rating, placement_rating, infrastructure_rating, what_i_liked, what_i_didnt_like, placement_experience, body_text, is_verified)
SELECT id, 'Aditya Patel', 'Electrical Engineering', 2020, 4.7, 4.8, 4.7, 4.5, 4.8, 4.7, ARRAY['Excellent faculty', 'World-class resources'], ARRAY['Difficult courses'], 'Placed at McKinsey with 35 LPA', 'Very good experience. Faculty is world-class and placements are exceptional.', true FROM colleges WHERE slug = 'iit-bombay' LIMIT 1;

-- BITS Pilani Reviews
INSERT INTO reviews (college_id, reviewer_name, course_studied, batch_year, overall_rating, academics_rating, faculty_rating, campus_rating, placement_rating, infrastructure_rating, what_i_liked, what_i_didnt_like, placement_experience, body_text, is_verified)
SELECT id, 'Neha Gupta', 'Computer Science', 2021, 4.7, 4.8, 4.6, 4.8, 4.7, 4.7, ARRAY['Great campus life', 'Good placements', 'Flexible curriculum'], ARRAY['High fees'], 'Placed at Adobe with 18 LPA', 'BITS is an excellent choice for engineering. Campus life is amazing and placements are solid.', true FROM colleges WHERE slug = 'bits-pilani' LIMIT 1;

INSERT INTO reviews (college_id, reviewer_name, course_studied, batch_year, overall_rating, academics_rating, faculty_rating, campus_rating, placement_rating, infrastructure_rating, what_i_liked, what_i_didnt_like, placement_experience, body_text, is_verified)
SELECT id, 'Rohan Kumar', 'Mechanical Engineering', 2020, 4.5, 4.6, 4.5, 4.7, 4.4, 4.5, ARRAY['Campus location', 'Good infrastructure'], ARRAY['Expensive', 'Heavy workload'], 'Placed at Uber with 16 LPA', 'Good college with decent placements. Campus is nice.', true FROM colleges WHERE slug = 'bits-pilani' LIMIT 1;

-- Delhi University Reviews
INSERT INTO reviews (college_id, reviewer_name, course_studied, batch_year, overall_rating, academics_rating, faculty_rating, campus_rating, placement_rating, infrastructure_rating, what_i_liked, what_i_didnt_like, placement_experience, body_text, is_verified)
SELECT id, 'Ananya Mishra', 'Physics (BSc)', 2021, 4.2, 4.3, 4.1, 4.0, 3.8, 4.1, ARRAY['Affordable education', 'Good faculty'], ARRAY['Infrastructure needs upgrade', 'Placement support limited'], 'Placed at TCS with 6.5 LPA', 'Good university for science streams. Education is affordable.', false FROM colleges WHERE slug = 'delhi-university' LIMIT 1;

INSERT INTO reviews (college_id, reviewer_name, course_studied, batch_year, overall_rating, academics_rating, faculty_rating, campus_rating, placement_rating, infrastructure_rating, what_i_liked, what_i_didnt_like, placement_experience, body_text, is_verified)
SELECT id, 'Vikram Desai', 'English (BA)', 2020, 4.1, 4.2, 4.0, 3.9, 3.5, 3.8, ARRAY['Good teachers', 'Library'], ARRAY['Placement support weak', 'Outdated infrastructure'], 'Self employed', 'DU has a good legacy. Faculty is knowledgeable.', false FROM colleges WHERE slug = 'delhi-university' LIMIT 1;

-- Manipal University Reviews
INSERT INTO reviews (college_id, reviewer_name, course_studied, batch_year, overall_rating, academics_rating, faculty_rating, campus_rating, placement_rating, infrastructure_rating, what_i_liked, what_i_didnt_like, placement_experience, body_text, is_verified)
SELECT id, 'Divya Reddy', 'Computer Science', 2021, 4.3, 4.4, 4.2, 4.4, 4.2, 4.3, ARRAY['Beautiful campus', 'Good placements', 'Lab facilities'], ARRAY['Expensive'], 'Placed at Infosys with 11 LPA', 'Manipal is a great campus with good facilities. Placements are decent.', true FROM colleges WHERE slug = 'manipal-university' LIMIT 1;

-- VIT Vellore Reviews
INSERT INTO reviews (college_id, reviewer_name, course_studied, batch_year, overall_rating, academics_rating, faculty_rating, campus_rating, placement_rating, infrastructure_rating, what_i_liked, what_i_didnt_like, placement_experience, body_text, is_verified)
SELECT id, 'Sanjay Nair', 'Electronics Engineering', 2020, 4.2, 4.3, 4.1, 4.2, 4.1, 4.3, ARRAY['Good infrastructure', 'Safe campus', 'Decent placements'], ARRAY['South location', 'Conservative campus'], 'Placed at Amazon with 13 LPA', 'VIT is a good engineering college with decent placements and good campus facilities.', true FROM colleges WHERE slug = 'vit-vellore' LIMIT 1;

-- Add reviews for remaining colleges
INSERT INTO reviews (college_id, reviewer_name, course_studied, batch_year, overall_rating, academics_rating, faculty_rating, campus_rating, placement_rating, infrastructure_rating, what_i_liked, what_i_didnt_like, placement_experience, body_text, is_verified)
SELECT id, 'Anonymous User', 'Computer Science', 2021, 4.0, 4.1, 3.9, 4.0, 3.9, 4.0, ARRAY['Good atmosphere', 'Decent faculty'], ARRAY['Limited placements'], 'Placed at TCS with 8 LPA', 'Good college with average placements.', false FROM colleges WHERE slug IN ('jnu', 'amity-university', 'srm-university', 'lovely-professional', 'shobhit-university', 'christ-university', 'ashoka-university', 'symbiosis-pune', 'bhatnagar-university', 'arya-college')
ORDER BY slug;

INSERT INTO reviews (college_id, reviewer_name, course_studied, batch_year, overall_rating, academics_rating, faculty_rating, campus_rating, placement_rating, infrastructure_rating, what_i_liked, what_i_didnt_like, placement_experience, body_text, is_verified)
SELECT id, 'Student Review', 'Engineering', 2020, 3.9, 4.0, 3.8, 3.9, 3.7, 3.9, ARRAY['Academics', 'Faculty'], ARRAY['Placements could be better'], 'Placed at Cognizant with 7.5 LPA', 'Average college experience.', false FROM colleges WHERE slug IN ('jnu', 'amity-university', 'srm-university', 'lovely-professional', 'shobhit-university', 'christ-university', 'ashoka-university', 'symbiosis-pune', 'bhatnagar-university', 'arya-college')
ORDER BY slug;

-- ========================================
-- 6. UPDATE COLLEGES WITH REALISTIC STATS
-- ========================================

UPDATE colleges SET overall_rating = 4.8, total_reviews = 245 WHERE slug = 'iit-delhi';
UPDATE colleges SET overall_rating = 4.9, total_reviews = 285 WHERE slug = 'iit-bombay';
UPDATE colleges SET overall_rating = 4.85, total_reviews = 220 WHERE slug = 'iit-madras';
UPDATE colleges SET overall_rating = 4.7, total_reviews = 195 WHERE slug = 'iit-kanpur';
UPDATE colleges SET overall_rating = 4.7, total_reviews = 320 WHERE slug = 'bits-pilani';
UPDATE colleges SET overall_rating = 4.3, total_reviews = 450 WHERE slug = 'delhi-university';
UPDATE colleges SET overall_rating = 4.5, total_reviews = 380 WHERE slug = 'manipal-university';
UPDATE colleges SET overall_rating = 4.4, total_reviews = 410 WHERE slug = 'vit-vellore';
UPDATE colleges SET overall_rating = 3.8, total_reviews = 280 WHERE slug = 'amity-university';
UPDATE colleges SET overall_rating = 3.9, total_reviews = 260 WHERE slug = 'srm-university';
UPDATE colleges SET overall_rating = 3.7, total_reviews = 200 WHERE slug = 'lovely-professional';
UPDATE colleges SET overall_rating = 3.6, total_reviews = 180 WHERE slug = 'shobhit-university';
UPDATE colleges SET overall_rating = 4.4, total_reviews = 350 WHERE slug = 'christ-university';
UPDATE colleges SET overall_rating = 4.6, total_reviews = 400 WHERE slug = 'ashoka-university';
UPDATE colleges SET overall_rating = 4.3, total_reviews = 370 WHERE slug = 'symbiosis-pune';
UPDATE colleges SET overall_rating = 4.1, total_reviews = 290 WHERE slug = 'jnu';
UPDATE colleges SET overall_rating = 3.5, total_reviews = 150 WHERE slug = 'bhatnagar-university';
UPDATE colleges SET overall_rating = 3.4, total_reviews = 140 WHERE slug = 'arya-college';

-- ========================================
-- 7. UPDATE PLACEMENT DATA IN COLLEGES TABLE
-- ========================================

UPDATE colleges SET placement_avg_package_lpa = 21.5, placement_highest_package_cr = 185, placement_percent = 98.2, placement_companies_count = 275 WHERE slug = 'iit-delhi';
UPDATE colleges SET placement_avg_package_lpa = 22.0, placement_highest_package_cr = 195, placement_percent = 98.5, placement_companies_count = 290 WHERE slug = 'iit-bombay';
UPDATE colleges SET placement_avg_package_lpa = 20.5, placement_highest_package_cr = 180, placement_percent = 98.0, placement_companies_count = 250 WHERE slug = 'iit-madras';
UPDATE colleges SET placement_avg_package_lpa = 19.5, placement_highest_package_cr = 170, placement_percent = 97.8, placement_companies_count = 240 WHERE slug = 'iit-kanpur';
UPDATE colleges SET placement_avg_package_lpa = 15.5, placement_highest_package_cr = 120, placement_percent = 96.5, placement_companies_count = 220 WHERE slug = 'bits-pilani';
UPDATE colleges SET placement_avg_package_lpa = 8.5, placement_highest_package_cr = 35, placement_percent = 78.5, placement_companies_count = 120 WHERE slug = 'delhi-university';
UPDATE colleges SET placement_avg_package_lpa = 11.0, placement_highest_package_cr = 80, placement_percent = 92.5, placement_companies_count = 180 WHERE slug = 'manipal-university';
UPDATE colleges SET placement_avg_package_lpa = 10.5, placement_highest_package_cr = 75, placement_percent = 91.0, placement_companies_count = 175 WHERE slug = 'vit-vellore';
UPDATE colleges SET placement_avg_package_lpa = 9.5, placement_highest_package_cr = 60, placement_percent = 85.5, placement_companies_count = 140 WHERE slug IN ('jnu', 'amity-university', 'srm-university', 'lovely-professional', 'shobhit-university', 'christ-university', 'ashoka-university', 'symbiosis-pune', 'bhatnagar-university', 'arya-college');

-- ========================================
-- 8. UPDATE MIN FEES PER YEAR (from courses)
-- ========================================

UPDATE colleges SET min_fees_per_year = (
  SELECT MIN(fees_per_year) FROM courses 
  WHERE courses.college_id = colleges.id
  AND fees_per_year IS NOT NULL
) WHERE EXISTS (
  SELECT 1 FROM courses WHERE courses.college_id = colleges.id
);

-- Set fallback fees for colleges without courses
UPDATE colleges SET min_fees_per_year = 400000 WHERE slug IN ('iit-delhi', 'iit-bombay', 'iit-madras', 'iit-kanpur') AND min_fees_per_year IS NULL;
UPDATE colleges SET min_fees_per_year = 600000 WHERE slug = 'bits-pilani' AND min_fees_per_year IS NULL;
UPDATE colleges SET min_fees_per_year = 500000 WHERE slug = 'manipal-university' AND min_fees_per_year IS NULL;
UPDATE colleges SET min_fees_per_year = 450000 WHERE slug = 'vit-vellore' AND min_fees_per_year IS NULL;
UPDATE colleges SET min_fees_per_year = 100000 WHERE slug = 'delhi-university' AND min_fees_per_year IS NULL;
UPDATE colleges SET min_fees_per_year = 300000 WHERE slug IN ('amity-university', 'srm-university', 'lovely-professional', 'shobhit-university', 'christ-university', 'ashoka-university', 'symbiosis-pune', 'bhatnagar-university', 'arya-college', 'jnu') AND min_fees_per_year IS NULL;

-- ========================================
-- VERIFICATION QUERIES (run these to verify data)
-- ========================================
-- SELECT COUNT(*) as total_courses FROM courses;
-- SELECT COUNT(*) as total_placements FROM placements;
-- SELECT COUNT(*) as total_reviews FROM reviews;
-- SELECT COUNT(*) as total_rankings FROM rankings;
-- SELECT name, min_fees_per_year, placement_avg_package_lpa, placement_percent FROM colleges ORDER BY slug;
-- SELECT name, (SELECT COUNT(*) FROM reviews WHERE reviews.college_id = colleges.id) as review_count FROM colleges;
