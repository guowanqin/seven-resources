-- 创建浏览量增加的函数
create or replace function increment_views(row_id bigint)
returns void
language plpgsql
security definer
as $$
begin
  update resources
  set views = views + 1
  where id = row_id;
end;
$$;
