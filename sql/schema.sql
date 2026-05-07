        -- Supabase / PostgreSQL schema for Collevo

        CREATE EXTENSION IF NOT EXISTS pgcrypto;

        CREATE TABLE IF NOT EXISTS colleges (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        type VARCHAR(50) NOT NULL DEFAULT 'private',
        established_year INTEGER,
        campus_size_acres DECIMAL(8,2),
        total_students INTEGER,
        total_faculty INTEGER,
        logo_url TEXT,
        banner_url TEXT,
        website TEXT,
        phone TEXT,
        email TEXT,
        naac_grade VARCHAR(10),
        approvals TEXT[] DEFAULT '{}',
        overall_rating DECIMAL(3,1),
        total_reviews INTEGER DEFAULT 0,
        placement_avg_package_lpa DECIMAL(5,2),
        placement_highest_package_cr DECIMAL(5,2),
        placement_percent DECIMAL(5,2),
        placement_companies_count INTEGER,
        nirf_ranking INTEGER,
        description TEXT,
        is_featured BOOLEAN DEFAULT false,
        min_fees_per_year DECIMAL(12,2),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        stream_preference VARCHAR(100),
        city VARCHAR(100),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS courses (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        degree_type VARCHAR(100) NOT NULL,
        degree_level VARCHAR(50) NOT NULL DEFAULT 'UG',
        stream VARCHAR(100) NOT NULL,
        specialization VARCHAR(255),
        duration_years DECIMAL(3,1) NOT NULL DEFAULT 4,
        program_type VARCHAR(50) NOT NULL DEFAULT 'full-time',
        total_fees DECIMAL(12,2),
        fees_per_year DECIMAL(12,2),
        eligibility TEXT,
        median_salary_lpa DECIMAL(5,2),
        total_seats INTEGER,
        application_open_date DATE,
        application_close_date DATE,
        created_at TIMESTAMPTZ DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS course_exams (
        course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
        exam_name VARCHAR(100) NOT NULL,
        PRIMARY KEY (course_id, exam_name)
        );

        CREATE TABLE IF NOT EXISTS rankings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
        agency VARCHAR(100) NOT NULL,
        rank INTEGER NOT NULL,
        total_ranked INTEGER,
        stream VARCHAR(100),
        year INTEGER NOT NULL
        );

        CREATE TABLE IF NOT EXISTS reviews (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
        reviewer_name VARCHAR(255) NOT NULL DEFAULT 'Anonymous',
        course_studied VARCHAR(255),
        batch_year INTEGER,
        overall_rating DECIMAL(3,1) NOT NULL,
        academics_rating DECIMAL(3,1),
        faculty_rating DECIMAL(3,1),
        campus_rating DECIMAL(3,1),
        placement_rating DECIMAL(3,1),
        infrastructure_rating DECIMAL(3,1),
        what_i_liked TEXT[] DEFAULT '{}',
        what_i_didnt_like TEXT[] DEFAULT '{}',
        placement_experience TEXT,
        body_text TEXT,
        is_verified BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS placements (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
        year INTEGER NOT NULL,
        avg_package_lpa DECIMAL(5,2),
        highest_package_cr DECIMAL(5,2),
        students_placed INTEGER,
        placement_percent DECIMAL(5,2),
        companies_count INTEGER,
        top_recruiters TEXT[] DEFAULT '{}'
        );

        CREATE TABLE IF NOT EXISTS saved_colleges (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        session_id VARCHAR(255),
        college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(user_id, college_id),
        UNIQUE(session_id, college_id)
        );

        -- Indexes
        CREATE INDEX IF NOT EXISTS idx_colleges_state ON colleges(state);
        CREATE INDEX IF NOT EXISTS idx_colleges_type ON colleges(type);
        CREATE INDEX IF NOT EXISTS idx_colleges_rating ON colleges(overall_rating DESC);
        CREATE INDEX IF NOT EXISTS idx_colleges_nirf ON colleges(nirf_ranking ASC NULLS LAST);
        CREATE INDEX IF NOT EXISTS idx_colleges_fees ON colleges(placement_avg_package_lpa);
        CREATE INDEX IF NOT EXISTS idx_colleges_search ON colleges USING gin(to_tsvector('english', name || ' ' || city || ' ' || state));
        CREATE INDEX IF NOT EXISTS idx_courses_college_id ON courses(college_id);
        CREATE INDEX IF NOT EXISTS idx_courses_stream ON courses(stream);
        CREATE INDEX IF NOT EXISTS idx_reviews_college_id ON reviews(college_id);
        CREATE INDEX IF NOT EXISTS idx_placements_college_year ON placements(college_id, year DESC);
        CREATE INDEX IF NOT EXISTS idx_saved_session ON saved_colleges(session_id);
