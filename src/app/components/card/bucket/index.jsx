import '../styles/card.scss';
import '../../../stylesheets/bucket';
import React from 'react';
import { connect } from 'react-redux'
import AppConstants from '../../../constants/constants';
import Draggable, { DraggableCore } from 'react-draggable';
import { getButtons } from './bucket-button.props';
import { Buttons, Bucketgrid, Rotate, Albums, Comments, Tag } from '../widgets';
import { setWidget } from '../../../redux/appState'
// import {
//   getPhotosBucket,
//   togglePhotosBucket,
//   addPhotoAlbumBucket,
//   commentPhotosBucket,
//   rotatePhotosBucket,
//   likePhotosBucket,
//   tagPhotosBucket,
// } from '../../../redux/bucket';
import { addBucketAlbum } from '../../../redux/album';
import { fetchBucket, fetchTaglist, rotateBucketPhotos } from '../../../redux/photo';
import { fetchAlbums } from '../../../redux/album';

const components = {
  INFO:   Bucketgrid,
  ROTATE:   Rotate,
  ALBUMS:   Albums,
  COMMENTS: Comments,
  TAG:      Tag,
  DELETE:   'Delete',
  LIKE:     'Like'
};

@connect((store) => {
  return {
    selectedWidget: store.app.get('selectedWidget'),//store.bucket.get('selectedWidget'),
    bucket: store.nPhoto.get('bucket'),
    albums: store.nAlbum.get('albums'),
    currentUser: store.nAuth.get('user'),
    taglist: store.nPhoto.get('taglist'),
  };
})
export default class Bucket extends React.Component {
  constructor(props) {
    super(props);
    // this.handleWidget = this.handleWidget.bind(this);
    this.addToAlbum = this.addToAlbum.bind(this);
    this.rotatePhotos = this.rotatePhotos.bind(this);
    this.addComment = this.addComment.bind(this);
    this.likePhotos = this.likePhotos.bind(this);
    this.deletePhotos = this.deletePhotos.bind(this);
    this.setWidget = this.setWidget.bind(this);
    this.addTag = this.addTag.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.dataProvider = this.dataProvider.bind(this);
    this.removePhoto = this.removePhoto.bind(this);
    this.state = {
      hidden: this.props.hidden,
    };
  };

  setWidget(widget) {
    this.props.dispatch(setWidget(widget.target.dataset.widget))
  }

  componentWillMount() {
    this.props.dispatch(fetchBucket());
    this.props.dispatch(fetchTaglist())
    this.props.dispatch(fetchAlbums())
  }

  removePhoto(id) {
    this.props.dispatch(togglePhotosBucket(id));
  }

  deletePhotos() {
    console.log('delete photos');
  }

  addTag(tag) {
    this.props.dispatch(tagPhotosBucket(tag));
  }

  removeTag() {
    console.log('remove photos');
  }

  likePhotos() {
    this.props.dispatch(likePhotosBucket());
  }

  rotatePhotos(degrees) {
    this.props.dispatch(rotateBucketPhotos(degrees))
  }

  addToAlbum(albumId) {
    this.props.dispatch(addBucketAlbum(albumId));
  }

  addComment(comment) {
    this.props.dispatch(commentPhotosBucket(comment));
  }

  dataProvider() {
    switch (this.props.selectedWidget) {
      case 'INFO': {
        return {
          bucket: this.props.bucket
        }
      }

      case 'ALBUMS': {
        return {
          albums: this.props.albums
        }
      }

      case 'COMMENTS': {
        return {
          comments: [],
          currentUser: this.props.currentUser,
        }
      }
      case 'TAG': {
        return {
          tags: [],
          taglist: this.props.taglist,
        }
      }
    }
  }

  render() {

    if (this.props.hidden) { return null}
    const props = this.props

    const WidgetType = components[props.selectedWidget];
    const widgetHandlers = {
      ROTATE:   this.rotatePhotos,
      ALBUMS:   this.addToAlbum,
      COMMENTS: this.addComment,
      ADDTAG:     this.addTag,
      REMOVETAG:  this.removeTag,
      DELETE:     this.deletePhotos,
      LIKE:       this.likePhotos,
      HIDE:     this.props.onHideBucket,
      REMOVE_FROM_BUCKET: this.removePhoto,
      SETWIDGET:  this.setWidget,
    };

    const buttons = getButtons(widgetHandlers)

    if (!['INFO'].includes(props.selectedWidget)) {
      buttons.vert = []
    }

    return (
      <Draggable handle=".header">
        <div className="pt-card upper-right show">
            <WidgetType data={this.dataProvider()} widgetHandlers={widgetHandlers}/>
            <Buttons buttons={buttons}
              widget={this.props.selectedWidget}
              widgetHandlers={this.widgetHandlers}/>
        </div>
     </Draggable>
   );
  }
}