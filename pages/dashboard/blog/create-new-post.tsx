import { ChangeEvent, Component, useState } from "react"
import Head from "next/head"
import moment from "moment"

import Header from "../../../components/dashboard/header"
import Sidebar from "../../../components/dashboard/sidebar.js"

import authUser from "../../../api/admin-user/auth.js"
import createNewPost from "../../../api/blog-posts/createNewPost.js"
import { Card, CardContent, CardHeader, Grid, TextField } from "@mui/material"
import Editor from '../../../components/editor';
import { NextPageContext } from "next"
import { PostProps } from "@/types/types"
import { Box } from "@mui/system"

CreatePost.getInitialProps = async ({req, res}: NextPageContext ) =>{
  const authResult = await authUser(req)

  if (!authResult.success) {
    res?.writeHead(302, { Location: "/login" })
    res?.end()
  }

  return {}
  }

export default function CreatePost(props: PostProps) {
const [submitLoading, setSubmitLoading] = useState(false)
const [submitSuccess, setSubmitSuccess] = useState(false)
const [submitError, setSubmitError] = useState(false)
const [errorMsg, setErrorMsg] = useState("")

const [input, setInput] = useState({
  titleInputValue: "",
  urlTitleInputValue: "",
  dateInputValue: "",
  tagsInputValue: "",
  imageUrlInputValue: "",
  markdownInputValue: "",
  seoTitleTagInputValue: "",
  seoTitleTagCharLeft: 60,
  metaDescriptionInputValue: "",
  metaDescriptionCharLeft: 160,
})


const updateTitleInputValue = (event :ChangeEvent<HTMLInputElement>) => {
  setInput({...input, titleInputValue: event.target.value})
}

const updateUrlTitleInputValue = (event :ChangeEvent<HTMLInputElement>) => {
  setInput({...input, urlTitleInputValue: event.target.value})
}

const updateDateInputValue = (event :ChangeEvent<HTMLInputElement>) => {
  setInput({...input,dateInputValue: event.target.value})
}

const setDateInputValueToNow = () => {
  const dateString = moment().format("YYYY-MM-DD")
  const timeString = moment().format("HH:mm")
  setInput({...input, dateInputValue: dateString + "T" + timeString})
}

const updateImageUrlInputValue = (event :ChangeEvent<HTMLInputElement>) => {
  setInput({...input, imageUrlInputValue: event.target.value})
 }

 const updateTagsInputValue = (event :ChangeEvent<HTMLInputElement>) => {
  setInput({...input, tagsInputValue: event.target.value})
 }

 const updateMarkdownInputValue = (value: string) => {
  setInput({...input, markdownInputValue: value})
 }

 const updateSeoTitleTagInputValue = (event :ChangeEvent<HTMLInputElement>) => {
    let charLeft
    if (60 - event.target.value.length > 0) {
      charLeft = 60 - event.target.value.length
    } else {
      charLeft = 0
    }

    setInput({...input,
      seoTitleTagInputValue: event.target.value,
      seoTitleTagCharLeft: charLeft
    })
  }

const updateMetaDescriptionInputValue = (event :any) => {
    let charLeft
    if (160 - event.target.value.length > 0) {
      charLeft = 160 - event.target.value.length
    } else {
      charLeft = 0
    }

    setInput({...input,
      metaDescriptionInputValue: event.target.value,
      metaDescriptionCharLeft: charLeft
    })
  }

const submitCreateNewPostRequest = () => {
    if (!input.titleInputValue) {
      setSubmitError(true)
      setErrorMsg("Title field is required.")
    } else if (!input.urlTitleInputValue) {
      setSubmitError(true)
      setErrorMsg("URL title field is required.")
    } else if (!input.dateInputValue) {
      setSubmitError(true)
      setErrorMsg("Date field is required.")
    } else if (!input.tagsInputValue) {
      setSubmitError(true)
      setErrorMsg("Tag field is required.")

    } else if (!input.markdownInputValue) {

      setSubmitError(true)
      setErrorMsg("Markdown content field is required.")

    } else if (!input.seoTitleTagInputValue) {
      setSubmitError(true)
      setErrorMsg("SEO title field is required.")

    } else if (!input.metaDescriptionInputValue) {
      setSubmitError(true)
      setErrorMsg("Meta description  field is required.")
      
    } else {
      setSubmitError(false)
      setSubmitSuccess(false)
      setSubmitLoading(true)
      setErrorMsg('')

      createNewPost(
        input.titleInputValue,
        input.urlTitleInputValue,
        moment(input.dateInputValue).valueOf() / 1000,
        input.tagsInputValue,
        input.imageUrlInputValue,
        input.markdownInputValue,
        input.seoTitleTagInputValue,
        input.metaDescriptionInputValue,
        function(apiResponse :any) {
          if (!apiResponse.authSuccess) {
            window.location.href = "/login"
          } else if (apiResponse.alreadyExistsError) {
            setSubmitError(true)
            setSubmitSuccess(false)
            setSubmitLoading(false)
            setErrorMsg("Blog post with that title already exists.")

          } else if (apiResponse.submitError || !apiResponse.success) {
            setSubmitError(true)
            setSubmitSuccess(false)
            setSubmitLoading(false)
            setErrorMsg("An error occurred.")
          } else {
            window.location.href = "/dashboard/"
          }
        }
      )
    }
  }

    return (
      <div className="db-layout-wrapper">
        <Head>
          <title>Create New Post | Admin</title>
        </Head>
        <Header />
        <Sidebar page="blog-posts" />
        <div className="db-layout-content-container">
          <div className="create-blog-post-content">
            <div className="create-blog-post-header">
              <span>Create New Blog Post</span>
            </div>
            <div className="create-blog-post-form-container">
              <div className="create-blog-post-form-section">
                <div className="create-blog-post-form-section-label">
                  <span>Title</span>
                </div>
                <div className="create-blog-post-form-section-input">
                  <input
                    type="text"
                    value={input.titleInputValue}
                    onChange={updateTitleInputValue}
                  />
                </div>
              </div>
              <div className="create-blog-post-form-section">
                <div className="create-blog-post-form-section-label">
                  <span>Url Title</span>
                </div>
                <div className="create-blog-post-form-section-input">
                  <input
                    type="text"
                    value={input.urlTitleInputValue}
                    onChange={updateUrlTitleInputValue}
                  />
                </div>
              </div>
              <div className="create-blog-post-form-section">
                <div className="create-blog-post-form-section-label">
                  <span>Date</span>
                </div>
                <div className="create-blog-post-form-section-input">
                  <input
                    type="datetime-local"
                    value={input.dateInputValue}
                    onChange={updateDateInputValue}
                  />
                  <span onClick={() => setDateInputValueToNow()} className="create-blog-post-form-section-date-input-now">Now</span>
                </div>
              </div>
              <div className="create-blog-post-form-section">
                <div className="create-blog-post-form-section-label">
                  <span>Image URL</span>
                </div>
                <div className="create-blog-post-form-section-input">
                  <input
                    type="text"
                    value={input.imageUrlInputValue}
                    onChange={updateImageUrlInputValue}
                  />
                </div>
              </div>
              <div className="create-blog-post-form-section">
                <div className="create-blog-post-form-section-label">
                  <span>Tags</span>
                </div>
                <div className="create-blog-post-form-section-input">
                  <input
                    type="text"
                    value={input.tagsInputValue}
                    onChange={updateTagsInputValue}
                  />
                </div>
              </div>
              <div className="create-blog-post-form-section">
                <div className="create-blog-post-form-section-label">
                  <span>Markdown Content</span>
                </div>
            <Grid item xs={12} md={8}>
            <Card>
              <CardHeader title="Markdown Content" />
              <CardContent>
                <Editor
                  id="full-editor"
                  value={input.markdownInputValue}
                  onChange={(value) => {
                    updateMarkdownInputValue(value)}}
                />
              </CardContent>
            </Card>
          </Grid>
              </div>
              <div className="create-blog-post-seo-section-title">
                <span>SEO</span>
              </div>
              <div className="create-blog-post-form-section">
                <div className="create-blog-post-form-section-label">
                  <span>Title Tag</span>
                </div>
                <div className="create-blog-post-form-section-input">
                  <input
                    type="text"
                    value={input.seoTitleTagInputValue}
                    onChange={updateSeoTitleTagInputValue}
                  />
                  <span className={input.seoTitleTagCharLeft > 0 ? "char-length green" : "char-length red"}>{input.seoTitleTagCharLeft}</span>
                </div>
              </div>
              <div className="create-blog-post-form-section">
                <div className="create-blog-post-form-section-label">
                  <span>Meta Description</span>
                </div>
                <div className="create-blog-post-form-section-input">
                  <textarea
                    value={input.metaDescriptionInputValue}
                    onChange={updateMetaDescriptionInputValue}
                  />
                  <span className={input.metaDescriptionCharLeft > 0 ? "char-length green" : "char-length red"}>
                    {input.metaDescriptionCharLeft}
                  </span>
                </div>
              </div>
              <div className="create-blog-post-form-btn-container">
                {
                  !submitLoading ?
                  <div onClick={submitCreateNewPostRequest} className="create-blog-post-form-btn">
                    <span>Submit</span>
                  </div> :
                  <div className="create-blog-post-form-btn loading">
                    <span>Loading</span>
                  </div>
                }
              </div>
              {
                submitError ?
                <div className="create-blog-post-submit-error-msg">
                  <span>{errorMsg}</span>
                </div> : null
              }
            </div>
          </div>
        </div>
      </div>
    )
}