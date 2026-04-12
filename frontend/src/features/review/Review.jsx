import React, { useEffect, useState } from 'react';
import StarRating from '../../components/ui/StarRating';
import useReview from '../../hooks/useReview';

const Review = ({ productId }) => {
  const { reviews, reviewLoading, error, createReviewHook, getReviewHook } = useReview();
  
  const [reviewForm, setReviewForm] = useState({ rating: 0, comment: '' });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleAddReview = async () => {
    if (reviewForm.rating === 0 || reviewForm.comment.trim() === '') {
      alert('Please provide a rating and comment.');
      return;
    }
    try {
      await createReviewHook(productId, reviewForm);
      await getReviewHook(productId);
      setReviewSubmitted(true);
      setReviewForm({ rating: 0, comment: '' });
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('Failed to submit review. Please try again.');
    }
  };

  useEffect(() => {
    if (productId) {
      getReviewHook(productId);
    }
  }, [productId]);

  if (reviewLoading) return <p style={{ color: 'var(--text-muted)' }}>Loading reviews...</p>;

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 28 }}>
        Customer <span className="gradient-text">Reviews</span>
        <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--text-muted)', marginLeft: 10 }}>
          ({reviews?.length || 0})
        </span>
      </h2>

      {/* Review List */}
      {reviews && reviews.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
          {reviews.map((r) => (
            <div key={r._id} className="glass-card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <img 
                  src={r.user?.profileImage || `https://i.pravatar.cc/40?u=${r.user?._id}`} 
                  alt={r.user?.name} 
                  style={{ width: 40, height: 40, borderRadius: '50%', flexShrink: 0 }} 
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>
                      {r.user?.name || 'Anonymous'}
                    </p>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                      {new Date(r.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <StarRating rating={r.rating} size={13} />
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 8, lineHeight: 1.7 }}>
                    {r.comment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: 'var(--text-muted)', marginBottom: 40 }}>
          No reviews yet. Be the first to review!
        </p>
      )}

      {/* Add Review Form */}
      <div className="glass-card" style={{ padding: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Write a Review</h3>
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, display: 'block' }}>
            Your Rating
          </label>
          <div style={{ display: 'flex', gap: 6 }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button 
                key={star} 
                onClick={() => setReviewForm({ ...reviewForm, rating: star })} 
                style={{ 
                  background: 'none', border: 'none', cursor: 'pointer', fontSize: 24, 
                  color: reviewForm.rating >= star ? '#f59e0b' : 'var(--border)', 
                  transition: 'color 0.15s' 
                }}
              >★</button>
            ))}
          </div>
        </div>
        <textarea
          value={reviewForm.comment}
          onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
          placeholder="Share your experience with this product..."
          className="input-field"
          style={{ minHeight: 90, resize: 'vertical', marginBottom: 14, width: '100%' }}
          maxLength={200}
        />
        {error && <p style={{ fontSize: 13, color: '#ef4444', marginBottom: 10 }}>✗ {error}</p>}
        {reviewSubmitted && <p style={{ fontSize: 13, color: '#10b981', marginBottom: 10 }}>✓ Review submitted!</p>}
        <button 
          onClick={handleAddReview} 
          disabled={reviewLoading}
          className="btn-primary" 
          style={{ padding: '10px 24px', borderRadius: 8, fontSize: 13, opacity: reviewLoading ? 0.7 : 1 }}
        >
          {reviewLoading ? 'Submitting...' : 'Submit Review'}
        </button>
      </div>
    </div>
  );
};

export default Review;