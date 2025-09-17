import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Main from './pages/list/Main';
import NewAlbum from './pages/list/NewAlbum';
import HotPlaylist from './pages/list/HotPlaylist';
import HotAlbum from './pages/list/HotAlbum';
import NewTrack from './pages/list/NewTrack';
import HotTrack from './pages/list/HotTrack';
import NewPlaylist from './pages/list/NewPlaylist';
import Search from './pages/search/Search';
import ArtistSearch from './pages/search/ArtistSearch';
import AlbumSearch from './pages/search/AlbumSearch';
import TrackSearch from './pages/search/TrackSearch';
import UserSearch from './pages/search/UserSearch';
import PlaylistSearch from './pages/search/PlaylistSearch';
import Album from './pages/review/Album';
import Artist from './pages/review/Artist';
import Track from './pages/review/Track';

const ReviewRoutes = () => {
  return (
    <Routes>
      <Route path='/artists' element={<Artist />} />
      <Route path='/albums' element={<Album />} />
      <Route path='/tracks' element={<Track />} />

      <Route path='/list/main' element={<Main />} />

      {/* 컨텐츠 목록 */}
      <Route path="/list/new-albums" element={<NewAlbum />} />
      <Route path="/list/hot-albums" element={<HotAlbum />} />
      <Route path="/list/new-tracks" element={<NewTrack />} />
      <Route path="/list/hot-tracks" element={<HotTrack />} />
      <Route path="/list/new-playlists" element={<NewPlaylist />} />
      <Route path="/list/hot-playlists" element={<HotPlaylist />} />

      {/* 검색 목록 */}
      <Route path="/search" element={<Search />} />
      <Route path="/search/artists" element={<ArtistSearch />} />
      <Route path="/search/albums" element={<AlbumSearch />} />
      <Route path="/search/tracks" element={<TrackSearch />} />
      <Route path="/search/users" element={<UserSearch />} />
      <Route path="/search/playlists" element={<PlaylistSearch />} />
    </Routes>
  )
}

export default ReviewRoutes