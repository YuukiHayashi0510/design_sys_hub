This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development

### Docker

#### 起動

```zsh
docker compose up
```

#### コンテナのシェルに入る

```zsh
docker exec -it design-sys-hub-postgres /bin/bash
```

#### psqlに入る

```bash
psql -U design_sh_admin
```

## PageComponent

Pages内にてページとして認識させるには、`*.page.tsx`にする必要あり
[参考](https://zenn.dev/uttk/articles/d6be1c224494cb)
