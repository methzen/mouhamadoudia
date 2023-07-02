import React, { ChangeEvent, Component, useState } from "react"
import UnprivilegedEditor from "react-quill"
import Head from "next/head"
import moment from "moment"
import { NextPageContext } from "next"
// import { Controlled as CodeMirror } from "react-codemirror2"

import Header from "../../../../components/dashboard/header"
import Sidebar from "../../../../components/dashboard/sidebar"
import DeleteBlogPostModal from "../../../../components/dashboard/modals/deleteBlogPost"

import getBlogPostById from "../../../../api/blog-posts/getPostById"
import editBlogPost from "../../../../api/blog-posts/editBlogPost"
import deleteBlogPost from "../../../../api/blog-posts/deleteBlogPost"
import { Card, CardContent, CardHeader, Grid } from "@mui/material"
import Editor from '../../../../components/editor';
import { PostProps } from "@/types/types"

if (typeof navigator !== "undefined") {
  // require("codemirror/mode/markdown/markdown")
}

editPost.getInitialProps = async ({req, res, query}: NextPageContext ) =>{
  const apiResult = await getBlogPostById(query.id, req)
  if (!apiResult.authSuccess) {
    res?.writeHead(302, { Location: "/login" })
    res?.end()
  }

  return {
    post: apiResult && apiResult.post,
    getDataError: apiResult && apiResult.getDataError,
    notFoundError: apiResult && apiResult.notFoundError
  }
}
export default function editPost (props : PostProps) {
  const {
    title,
    urlTitle,
    tags,
    dateTimestamp,
    thumbnailImageUrl,
    markdownContent,
    seoTitleTag,
    seoMetaDescription
  
  } = props.post
  const [submitLoading, setSubmitLoading] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [deleteError, setDeleteError] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [input, setInput] = useState({
    titleInputValue: title && title,
    urlTitleInputValue: urlTitle && urlTitle,
    dateInputValue: dateTimestamp && moment.unix(dateTimestamp).format("YYYY-MM-DD") + "T" + moment.unix(dateTimestamp).format("HH:mm"),
    tagsInputValue: tags && tags.join(", "),
    imageUrlInputValue: thumbnailImageUrl && thumbnailImageUrl,
    markdownInputValue: markdownContent && markdownContent,
    seoTitleTagInputValue: seoTitleTag && seoTitleTag,
    seoTitleTagCharLeft: seoTitleTag && 60 - seoTitleTag.length,
    metaDescriptionInputValue: seoMetaDescription && seoMetaDescription,
    metaDescriptionCharLeft: seoMetaDescription && 160 - seoMetaDescription.length,
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
  const showSuccessMsg = () => {
    setSubmitSuccess(true)
  
    setTimeout(function(){
      setSubmitSuccess(false)
    }, 3000)
  }

  const submitEditPostRequest = () => {
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

      editBlogPost(
        props.post.id,
        input.titleInputValue,
        input.urlTitleInputValue,
        moment(input.dateInputValue).valueOf() / 1000,
        input.tagsInputValue,
        input.imageUrlInputValue,
        input.markdownInputValue,
        input.seoTitleTagInputValue,
        input.metaDescriptionInputValue,
        function(apiResponse:any) {
          if (apiResponse.submitError) {
            setSubmitError(true)
            setSubmitSuccess(false)
            setSubmitLoading(false)
            setErrorMsg('An error occurred.')
          } else if (!apiResponse.authSuccess) {
            window.location.href = "/login"
          } else if (apiResponse.notFoundError) {
            setSubmitError(true)
            setSubmitSuccess(false)
            setSubmitLoading(false)
            setErrorMsg("Blog post not found.")
          } else if (!apiResponse.success) {
            setSubmitError(true)
            setSubmitSuccess(false)
            setSubmitLoading(false)
            setErrorMsg("An error occurred.")

          } else {
            setSubmitError(false)
            setSubmitLoading(false)
            showSuccessMsg()
          }
        }
      )
    }
  }

  const showDeleteModalRequest = () => {
    setShowDeleteModal(true)
  }

  const hideDeleteModalRequest = () => {
    setShowDeleteModal(false)
    setDeleteError(false)
    setDeleteLoading(false)
  }

  const deleteBlogPostRequest = () => {
    setDeleteLoading(true)
  
    deleteBlogPost(props.post.id, function(apiResponse:any) {
      if (apiResponse.submitError) {
        setShowDeleteModal(false)
        setDeleteError(true)
        setDeleteLoading(false)
      } else if (!apiResponse.authSuccess) {
        window.location.href = "/login"
      } else if (!apiResponse.success) {
        setShowDeleteModal(false)
        setDeleteError(true)
        setDeleteLoading(false)
      } else {
        window.location.href = "/dashboard"
      }
    })
  }

    return (
      <div className="db-layout-wrapper">
        <Head>
          <title>Edit Post | Admin</title>
        </Head>
        <Header />
        <Sidebar page="blog-posts" />
        <div className="db-layout-content-container">
          {
            !props.getDataError && !props.notFoundError ?
            <div className="edit-blog-post-content">
              <div className="edit-blog-post-header">
                <span>Edit Blog Post</span>
              </div>
              <div className="edit-blog-post-form-container">
                <div className="edit-blog-post-form-section">
                  <div className="edit-blog-post-form-section-label">
                    <span>Title</span>
                  </div>
                  <div className="edit-blog-post-form-section-input">
                    <input
                      type="text"
                      value={input.titleInputValue}
                      onChange={updateTitleInputValue}
                    />
                  </div>
                </div>
                <div className="edit-blog-post-form-section">
                  <div className="edit-blog-post-form-section-label">
                    <span>Url Title</span>
                  </div>
                  <div className="edit-blog-post-form-section-input">
                    <input
                      type="text"
                      value={input.urlTitleInputValue}
                      onChange={updateUrlTitleInputValue}
                    />
                  </div>
                </div>
                <div className="edit-blog-post-form-section">
                  <div className="edit-blog-post-form-section-label">
                    <span>Date</span>
                  </div>
                  <div className="edit-blog-post-form-section-input">
                    <input
                      type="datetime-local"
                      value={input.dateInputValue}
                      onChange={updateDateInputValue}
                    />
                    <span onClick={() => setDateInputValueToNow()} className="edit-blog-post-form-section-date-input-now">Now</span>
                  </div>
                </div>
                <div className="edit-blog-post-form-section">
                  <div className="edit-blog-post-form-section-label">
                    <span>Image URL</span>
                  </div>
                  <div className="edit-blog-post-form-section-input">
                    <input
                      type="text"
                      value={input.imageUrlInputValue}
                      onChange={updateImageUrlInputValue}
                    />
                  </div>
                </div>
                <div className="edit-blog-post-form-section">
                  <div className="edit-blog-post-form-section-label">
                    <span>Tags</span>
                  </div>
                  <div className="edit-blog-post-form-section-input">
                    <input
                      type="text"
                      value={input.tagsInputValue}
                      onChange={updateTagsInputValue}
                    />
                  </div>
                </div>
                <div className="edit-blog-post-form-section">
          <Grid item xs={12} md={8}>
            <Card>
              <CardHeader title="Markdown Content" />
              <CardContent>
                <Editor
                  id="full-editor"
                  value={input.markdownInputValue}
                  onChange={updateMarkdownInputValue}
                />
              </CardContent>
            </Card>
          </Grid>
                </div>
                <div className="edit-blog-post-seo-section-title">
                  <span>SEO</span>
                </div>
                <div className="edit-blog-post-form-section">
                  <div className="edit-blog-post-form-section-label">
                    <span>Title Tag</span>
                  </div>
                  <div className="edit-blog-post-form-section-input">
                    <input
                      type="text"
                      value={input.seoTitleTagInputValue}
                      onChange={updateSeoTitleTagInputValue}
                    />
                    <span className={input.seoTitleTagCharLeft as number > 0 ? "char-length green" : "char-length red"}>{input.seoTitleTagCharLeft}</span>
                  </div>
                </div>
                <div className="edit-blog-post-form-section">
                  <div className="edit-blog-post-form-section-label">
                    <span>Meta Description</span>
                  </div>
                  <div className="edit-blog-post-form-section-input">
                    <textarea

                      value={input.metaDescriptionInputValue}
                      onChange={updateMetaDescriptionInputValue}
                    />
                    <span className={input.metaDescriptionCharLeft as number > 0 ? "char-length green" : "char-length red"}>
                      {input.metaDescriptionCharLeft}
                    </span>
                  </div>
                </div>
                <div className="edit-blog-post-form-btns-section">
                  <div className="edit-blog-post-form-submit-btn-container">
                    {
                      !submitLoading ?
                      <div onClick={submitEditPostRequest} className="edit-blog-post-form-btn">
                        <span>Submit</span>
                      </div> :
                      <div className="edit-blog-post-form-btn loading">
                        <span>Loading</span>
                      </div>
                    }
                  </div>
                  <div onClick={showDeleteModalRequest} className="edit-blog-post-form-delete">
                    <span>Delete</span>
                  </div>
                </div>
                {
                  submitError ?
                  <div className="edit-blog-post-submit-error-msg">
                    <span>{errorMsg}</span>
                  </div> : null
                }
                {
                  submitSuccess ?
                  <div className="edit-blog-post-submit-success-msg">
                    <span>Success!</span>
                  </div> : null
                }
              </div>
            </div> :
            <div className="edit-blog-post-get-data-error-msg">
              {
                props.getDataError ?
                <span>An error occurred.</span> :
                <span>Blog post not found.</span>
              }
            </div>
          }
        </div>
        <DeleteBlogPostModal
          error={deleteError}
          loading={deleteLoading}
          show={showDeleteModal}
          hideRequest={hideDeleteModalRequest}
          deleteBlogPostRequest={deleteBlogPostRequest}
        />
      </div>
    )
}