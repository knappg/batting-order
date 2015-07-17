create table lineups (
  lineup_id     bigserial primary key,
  lineup_data   integer[9] not null,
  average_runs  double precision not null
);
