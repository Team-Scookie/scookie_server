# scookie_server

> 헨젤과 그레텔 가는 길마다 쿠키를 떨어트렸던 것 처럼, 30분 이상 머문 장소를 쿠키로 표시해 하루의 일상을 기록하는 🍪 scookie 🍪 의 서버를 개발합니다.

## Technology

- Node.js, Express
- Database: MongoDB(Atlas)
- Deployment: AWS
- Others: Swagger, Jest

## Team

|        강영우         |        김혜지         |        백예은         |
| :-------------------: | :-------------------: | :-------------------: |
| <img width=85 src=""> | <img width=85 src=""> | <img width=85 src=""> |

</div>

## Rules

1. Lint: [ESLint(airbnb-base)](https://github.com/eslint/eslint)
2. Commit Convention: [Semantic Commit Messages](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)
3. Git Workflow: Gitlab flow

## Docs

- [HTTP Authorization header에 Bearer와 jwt 중 무엇을 사용할까?](https://velog.io/@hyex/HTTP-Authorization-header%EC%97%90-Bearer%EC%99%80-jwt-%EC%A4%91-%EB%AC%B4%EC%97%87%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%A0%EA%B9%8C)
- [Node.js 프로젝트에 swagger 적용하기 (Feat. 파일 분리)](https://velog.io/@hyex/Node.js-TS-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90-swagger-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0-Feat.-%ED%8C%8C%EC%9D%BC-%EB%B6%84%EB%A6%AC)

#### Trouble-shooting 💥

- [You are trying to `import` a file after the Jest environment has been torn down.](https://velog.io/@hyex/moogosejest-ReferenceError-You-are-trying-to-import-a-file-after-the-Jest-environment-has-been-torn-down)

## How To Start

```bash
npm install
# .env 파일 생성
npm start
```

- `env` format

```bash
MONGO_URI=
KAKAO_KEY=
TOKEN_SECRET_KEY=
```
