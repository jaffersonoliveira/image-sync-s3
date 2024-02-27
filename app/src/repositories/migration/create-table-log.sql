create table if not exists log (
  log_id serial4 primary key,
  log_timestamp timestamp not null,
  log_file_path text not null,
  log_file_key text not null,
  log_action varchar(255),
  log_status varchar(255)
)	