import {
  to = aws_s3_bucket.website-frontend-s3
  id = "www.warpedcitadel.com"
}

import {
  to = aws_s3_bucket.website-frontend-s3-alt
  id = "warpedcitadel.com"
}

resource "aws_s3_bucket" "website-frontend-s3" {
  bucket              = "www.warpedcitadel.com"
  bucket_namespace    = "global"
  force_destroy       = false
  object_lock_enabled = false
  policy = jsonencode(
    {
      Statement = [
        {
          Action    = "s3:GetObject"
          Effect    = "Allow"
          Principal = "*"
          Resource  = "arn:aws:s3:::www.warpedcitadel.com/*"
          Sid       = "PublicReadOnly"
        },
      ]
      Version = "2012-10-17"
    }
  )
  region        = "us-east-2"
  request_payer = "BucketOwner"
  tags          = {}
  tags_all      = {}
  grant {
    id = "fd6924e58bbe969af28ffd63124ed4bb660a5f52eff86e4978b7669eb488b8ac"
    permissions = [
      "FULL_CONTROL",
    ]
    type = "CanonicalUser"
  }
  server_side_encryption_configuration {
    rule {
      bucket_key_enabled = true
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }
  versioning {
    enabled    = false
    mfa_delete = false
  }
  website {
    index_document = "index.html"
  }
}

resource "aws_s3_bucket" "website-frontend-s3-alt" {
  bucket              = "warpedcitadel.com"
  bucket_namespace    = "global"
  force_destroy       = false
  object_lock_enabled = false
  policy = jsonencode(
    {
      Statement = [
        {
          Action = "s3:GetObject"
          Condition = {
            StringEquals = {
              "AWS:SourceArn" = "arn:aws:cloudfront::702527818199:distribution/E2JS2CHK2UNXR2"
            }
          }
          Effect = "Allow"
          Principal = {
            Service = "cloudfront.amazonaws.com"
          }
          Resource = "arn:aws:s3:::warpedcitadel.com/*"
          Sid      = "AllowCloudFrontServicePrincipalReadOnly"
        },
      ]
      Version = "2012-10-17"
    }
  )
  region        = "us-east-2"
  request_payer = "BucketOwner"
  tags          = {}
  tags_all      = {}
  grant {
    id = "fd6924e58bbe969af28ffd63124ed4bb660a5f52eff86e4978b7669eb488b8ac"
    permissions = [
      "FULL_CONTROL",
    ]
    type = "CanonicalUser"
  }
  server_side_encryption_configuration {
    rule {
      bucket_key_enabled = true
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }
  versioning {
    enabled    = false
    mfa_delete = false
  }
  website {
    redirect_all_requests_to = "https://www.warpedcitadel.com"
  }
}
