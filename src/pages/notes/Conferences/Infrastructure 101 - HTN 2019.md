## Notes on a talk by Jeff An (Infrastructure Engineer @ Google)

### Docker Compose

Just in case you don't know, Docker is a useful tool for building your software abstracted from the operating system, and ensuring it runs identically across the deployment scheme.

_Docker Compose_ lets you coordinate the docker containers with one another and let you run multiple in tandem for launching a product in different modes (e.g. development, staging, etc.).

The `docker-compose.yml` will launch your backend container, frontend container, and logging container all from one terminal, leading to much faster building/development!

### Container Orchestration

Container orchestration is a broad term for allowing you to deploy docker containers on multiple different machines. It's essentially the concept employed in a bunch of other popular software items:

- Docker Stacks/Swarm
- AWS Elastic Load Balancing
- Google's Kubernetes

They take advantage of the `deploy` key on your `yaml` file, where you indicate the number of replica's you'd like to spin up. The request load will be mediated and distributed along these servers to accommodate for high traffic/spikes in activity.

### Using Amazon Web Services

Amazon Web Services is an extremely valuable resource for modern infrastructure engineers. It boils down to a few main points which AWS expertly sells you on:

- resource liquidity
- cross-region reliability
- immense service offerings

For anyone who's ever looked at making an AWS Suite account, you definitely know the last one holds true. In terms of deployment infrastructure, you have so many choices!

- Frontend
  - _S3_ - to serve the static website
  - _Cloudfront_ - to serve static assets
- Backend
  - _EC2_ - a server instance running with your code on it
  - _EB_ - elastic load balancing, to provide dynamic replicas (through the aforementioned container orchestration)

### Why Infrastructure?

Infrastructure is super important across the board but it can be drastically simplified to just these key benefits in your application:

- Reliability
- Scalability
- Security
- Efficiency

Link to the slides: [lgr.fyi/hMuK3](https://lgr.fyi/hMuK3)<br>
Link to the demo repo: [lgr.fyi/TWKX7](https://lgr.fyi/TWKX7)
