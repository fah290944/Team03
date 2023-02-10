package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestServiceValidate(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Check Customer", func(t *testing.T) {
		s := Service{
			CustomerID:      0,
			Time:            time.Now(),
			FoodID:          1,
			FoodItem:        1,
			DrinkID:         1,
			DrinkItem:       1,
			AccessoriesID:   1,
			AccessoriesItem: 1,
		}

		ok, err := govalidator.ValidateStruct(s)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Please Login"))
	})
	t.Run("Check Food", func(t *testing.T) {
		s := Service{
			CustomerID:      1,
			Time:            time.Now(),
			FoodID:          0,
			FoodItem:        1,
			DrinkID:         1,
			DrinkItem:       1,
			AccessoriesID:   1,
			AccessoriesItem: 1,
		}

		ok, err := govalidator.ValidateStruct(s)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Choose Food"))
	})
	t.Run("Check Drink", func(t *testing.T) {
		s := Service{
			CustomerID:      1,
			Time:            time.Now(),
			FoodID:          1,
			FoodItem:        1,
			DrinkID:         0,
			DrinkItem:       1,
			AccessoriesID:   1,
			AccessoriesItem: 1,
		}

		ok, err := govalidator.ValidateStruct(s)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Choose Drink"))
	})
	t.Run("Check Accessories", func(t *testing.T) {
		s := Service{
			CustomerID:      1,
			Time:            time.Now(),
			FoodID:          1,
			FoodItem:        1,
			DrinkID:         1,
			DrinkItem:       1,
			AccessoriesID:   0,
			AccessoriesItem: 1,
		}

		ok, err := govalidator.ValidateStruct(s)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Choose Accessories"))
	})
	t.Run("Check Food Item", func(t *testing.T) {
		s := Service{
			CustomerID:      1,
			Time:            time.Now(),
			FoodID:          1,
			FoodItem:        -1,
			DrinkID:         1,
			DrinkItem:       1,
			AccessoriesID:   1,
			AccessoriesItem: 1,
		}

		ok, err := govalidator.ValidateStruct(s)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("FoodItem: -1 does not validate as range(0|50)"))
	})
	t.Run("Check Drink Item", func(t *testing.T) {
		s := Service{
			CustomerID:      1,
			Time:            time.Now(),
			FoodID:          1,
			FoodItem:        1,
			DrinkID:         1,
			DrinkItem:       -1,
			AccessoriesID:   1,
			AccessoriesItem: 1,
		}

		ok, err := govalidator.ValidateStruct(s)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("DrinkItem: -1 does not validate as range(0|50)"))
	})
	t.Run("Check Accessories Item", func(t *testing.T) {
		s := Service{
			CustomerID:      1,
			Time:            time.Now(),
			FoodID:          1,
			FoodItem:        1,
			DrinkID:         1,
			DrinkItem:       1,
			AccessoriesID:   1,
			AccessoriesItem: -1,
		}

		ok, err := govalidator.ValidateStruct(s)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("AccessoriesItem: -1 does not validate as range(0|50)"))
	})
}
