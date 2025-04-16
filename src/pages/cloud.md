---
title: "ERDDAP™ and the Cloud"
---
# ERDDAP™ and the Cloud

## What is the Cloud

The simplest definition is not local servers. This is very broad and can mean many different setups. For example, it could be a dedicated physical server in a data center, a Virtual Private Server, a shared server, serverless, or something else.

### Why Cloud

There are many reasons organizations want to move to the cloud. The most important one is the flexibility it provides for compute/storage needs compared to buying physical hardware.

This eliminates the need to maintain a datacenter/server room. It also allows for scaling compute resources to your current needs. Much like the cloud can mean many different things, being able to scale your resources does as well. It could mean paying for more (or less) serverless resources. It could mean moving from a shared server to a private server. It could mean upgrading to a larger dedicated physical server.

## Can ERDDAP™ run in the cloud?

Yes.

ERDDAP™ is designed to run within Tomcat which can be run locally or in cloud environments. There is community support for running in Docker and there is [official Docker support coming soon](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md).

That said, ERDDAP™ was designed at a time when dedicated servers were the norm. It is not serverless, and would be extremely difficult if not impossible to make it serverless.

### Can ERDDAP™ scale?

Scaling ERDDAP™ is more complicated than just using more serverless resources. We have some great documentation on [how to scale ERDDAP™](https://erddap.github.io/docs/server-admin/scaling). Making it easier to scale ERDDAP™ is something we’re interested in.

### What prevents autoscaling?

ERDDAP™ is doing many things including keeping datasets up to date, notifying subscribers of changes to datasets, caching data, handling user requests, and more. For a sufficiently large ERDDAP™ server like [CoastWatch](https://coastwatch.pfeg.noaa.gov/erddap/index.html), this means it is continually doing something. Continual usage is actually an extremely expensive situation for serverless options (you pay a large premium for compute when doing serverless and so the main advantage is when you only occasionally make calls). Additionally, trying to move all of ERDDAP™’s various functionality to serverless versions would end up with a significantly more complicated setup required for admins.

### Can ERDDAP™ use Cloud Storage?

Yes.

ERDDAP™ supports cloud storage (including AWS S3) and improving this support (for example non-AWS S3) is a high priority on the ERDDAP™ development roadmap. ERDDAP™ is also capable of pulling data from many existing online services. For more information I recommend looking through our [dataset type documentation](https://erddap.github.io/docs/server-admin/datasets#detailed-descriptions-of-dataset-types).
