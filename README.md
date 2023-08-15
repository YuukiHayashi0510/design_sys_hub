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

## Testing

- Jest
- ts-node
- [next-test-api-route-handler](https://qiita.com/tatsuya-miyamoto/items/f99eb069f65b30f2f816#%E5%9F%BA%E6%9C%AC%E7%B3%BB)
- faker

## PageComponent

Pages内にてページとして認識させるには、`*.page.tsx`にする必要あり
[参考](https://zenn.dev/uttk/articles/d6be1c224494cb)
