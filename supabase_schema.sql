-- 在 Supabase SQL Editor 中运行此 SQL 来创建资源表

create table if not exists resources (
  id bigint primary key generated always as identity,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  category text not null,
  download_url text,
  image_url text,
  is_vip boolean default false,
  views integer default 0,
  likes integer default 0,
  content text -- 用于存储详情页的富文本内容
);

-- 开启 Row Level Security (RLS)
alter table resources enable row level security;

-- 创建策略：允许所有人查看资源
create policy "Public resources are viewable by everyone"
  on resources for select
  using ( true );

-- 创建策略：仅允许登录用户发布 (实际生产中应限制为管理员)
create policy "Users can insert resources"
  on resources for insert
  with check ( auth.role() = 'authenticated' );

-- 创建策略：仅允许登录用户更新
create policy "Users can update resources"
  on resources for update
  using ( auth.role() = 'authenticated' );
