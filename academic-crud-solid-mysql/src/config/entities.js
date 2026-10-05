export const entities = {
  identificationTypes: {
    table: 'identification_types',
    idField: 'id',
    fields: ['code', 'name', 'description']
  },

  cities: {
    table: 'cities',
    idField: 'id',
    fields: ['code', 'name']
  },

  students: {
    table: 'students',
    idField: 'id',
    fields: [
      'code', 'firstName', 'lastName', 'identification_type_id',
      'identificationNumber', 'gender', 'birthdate', 'email',
      'address', 'city_id'
    ]
  },

  teachers: {
    table: 'teachers',
    idField: 'id',
    fields: [
      'firstName', 'lastName', 'identification_type_id',
      'identificationNumber', 'email'
    ]
  },

  classrooms: {
    table: 'classrooms',
    idField: 'id',
    fields: ['code', 'description', 'capacity', 'active']
  },

  courses: {
    table: 'courses',
    idField: 'id',
    fields: ['code', 'description', 'intensity', 'weight', 'active']
  },

  coursesSchedules: {
    table: 'courses_schedules',
    idField: 'id',
    fields: [
      'course_id', 'teacher_id', 'classroom_id',
      'start_date', 'end_date', 'active'
    ]
  },

  inscriptions: {
    table: 'inscriptions',
    idField: 'id',
    fields: [
      'course_schedule_id', 'student_id',
      'register_date', 'active'
    ]
  },

  rates: {
    table: 'rates',
    idField: 'id',
    fields: ['inscription_id', 'rate', 'comments']
  },

  topics: {
    table: 'topics',
    idField: 'id',
    fields: ['course_id', 'code', 'title', 'description', 'active']
  }
};
