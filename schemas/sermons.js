import {MdVideoLibrary} from 'react-icons/md';
import AudioPlayer from '../audio-playback';
//import BibleInput from '../bible-input';

export default {
  name: 'sermons',
  title: 'Sermons',
  icon: MdVideoLibrary,
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        slugify: input => {
          const a =
            'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
          const b =
            'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnooooooooprrsssssttuuuuuuuuuwxyyzzz------';
          const p = new RegExp(a.split('').join('|'), 'g');

          return input
            .toString()
            .toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
            .replace(/&/g, '-and-') // Replace & with 'and'
            .replace(/[^\w\-]+/g, '') // Remove all non-word characters
            .replace(/\-\-+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, ''); // Trim - from end of text
        }
      },
      validation: Rule => Rule.required()
    },
    {
      title: 'Passage',
      name: 'passage',
      type: 'string',
      /*inputComponent: BibleInput,*/
      validation: Rule => Rule.required()
    },
    {
      title: 'Date preached',
      name: 'preachedDate',
      type: 'date',
      options: [{dateFormat: 'dddd, MMMM Do YYYY'}],
      validation: Rule => Rule.required()
    },
    {
      title: 'Preacher',
      name: 'preacher',
      type: 'reference',
      to: [{type: 'speaker'}],
      validation: Rule => Rule.required()
    },
    {
      title: 'Series',
      name: 'series',
      type: 'reference',
      to: [{type: 'series'}],
      validation: Rule => Rule.required()
    },
    {
      title: 'Audio',
      name: 'file',
      type: 'string',
      inputComponent: AudioPlayer
    }
  ]
};
